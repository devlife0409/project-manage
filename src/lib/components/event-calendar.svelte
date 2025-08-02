<script lang="ts">
	import { projects, deleteTask, getStatusColor, type Task } from '$lib/stores/tasks';
	import TaskFormModal from './task-form-modal.svelte';
	import Button from './ui/button.svelte';
	import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-svelte';

	type Props = {
		projectId: string;
	};

	let { projectId }: Props = $props();

	let showTaskForm = $state(false);
	let editingTask = $state<Task | null>(null);
	let currentDate = $state(new Date());

	const currentProject = $derived(() => {
		return $projects.find(p => p.id === projectId);
	});

	const tasks = $derived(() => {
		return currentProject?.tasks || [];
	});

	const currentMonth = $derived(() => currentDate.getMonth());
	const currentYear = $derived(() => currentDate.getFullYear());

	const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
	const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

	function getDaysInMonth(year: number, month: number): number {
		return new Date(year, month + 1, 0).getDate();
	}

	function getFirstDayOfMonth(year: number, month: number): number {
		return new Date(year, month, 1).getDay();
	}

	const daysInMonth = $derived(() => getDaysInMonth(currentYear, currentMonth));
	const firstDay = $derived(() => getFirstDayOfMonth(currentYear, currentMonth));
	const calendarDays = $derived(() => {
		return Array.from({ length: 42 }, (_, i) => {
			const dayNumber = i - firstDay + 1;
			return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
		});
	});

	function getTasksForDay(day: number | null): Task[] {
		if (!day) return [];
		const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		
		return tasks.filter(task => {
			const taskStart = new Date(task.startDate);
			const taskEnd = new Date(task.endDate);
			const currentDay = new Date(dateStr);
			
			return currentDay >= taskStart && currentDay <= taskEnd;
		});
	}

	function openAddTask() {
		editingTask = null;
		showTaskForm = true;
	}

	function openEditTask(task: Task) {
		editingTask = task;
		showTaskForm = true;
	}

	function handleDeleteTask(task: Task) {
		if (confirm(`"${task.name}" 작업을 삭제하시겠습니까?`)) {
			deleteTask(task.id);
		}
	}

	function closeTaskForm() {
		showTaskForm = false;
		editingTask = null;
	}

	function previousMonth() {
		currentDate = new Date(currentYear, currentMonth - 1, 1);
	}

	function nextMonth() {
		currentDate = new Date(currentYear, currentMonth + 1, 1);
	}

	function isToday(day: number | null): boolean {
		if (!day) return false;
		const today = new Date();
		return day === today.getDate() && 
			   currentMonth === today.getMonth() && 
			   currentYear === today.getFullYear();
	}
</script>

<div class="space-y-4">
	<!-- 캘린더 헤더 -->
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-semibold">{currentYear}년 {monthNames[currentMonth]}</h2>
		<div class="flex items-center gap-2">
			<Button onclick={openAddTask} size="sm" class="gap-2">
				<Plus class="h-4 w-4" />
				작업 추가
			</Button>
			<div class="flex gap-2">
				<button onclick={previousMonth} class="p-1 hover:bg-secondary rounded-md">
					<ChevronLeft class="h-4 w-4" />
				</button>
				<button onclick={nextMonth} class="p-1 hover:bg-secondary rounded-md">
					<ChevronRight class="h-4 w-4" />
				</button>
			</div>
		</div>
	</div>

	<!-- 캘린더 그리드 -->
	<div class="border rounded-lg overflow-hidden">
		<!-- 요일 헤더 -->
		<div class="grid grid-cols-7 bg-muted">
			{#each dayNames as dayName}
				<div class="p-3 text-center font-medium border-r last:border-r-0">{dayName}</div>
			{/each}
		</div>

		<!-- 날짜 그리드 -->
		<div class="grid grid-cols-7">
			{#each calendarDays as day}
				{@const dayTasks = getTasksForDay(day)}
				<div class="min-h-32 p-2 border-r border-b last:border-r-0 hover:bg-muted/50 group {isToday(day) ? 'bg-accent/30' : ''}">
					{#if day}
						<div class="text-sm font-medium mb-1">{day}</div>
						<div class="space-y-1">
							{#each dayTasks.slice(0, 2) as task}
								<div class="relative group/task">
									<div 
										class="text-xs p-1 rounded {task.color || getStatusColor(task.status)} text-white truncate cursor-pointer"
										title={task.name}
										onclick={() => openEditTask(task)}
									>
										{task.name}
									</div>
									<div class="absolute top-0 right-0 opacity-0 group-hover/task:opacity-100 flex gap-1">
										<button
											onclick={(e) => {
												e.stopPropagation();
												openEditTask(task);
											}}
											class="p-0.5 bg-black/50 hover:bg-black/70 rounded text-white"
											title="편집"
										>
											<Edit class="h-2 w-2" />
										</button>
										<button
											onclick={(e) => {
												e.stopPropagation();
												handleDeleteTask(task);
											}}
											class="p-0.5 bg-red-500/80 hover:bg-red-500 rounded text-white"
											title="삭제"
										>
											<Trash2 class="h-2 w-2" />
										</button>
									</div>
								</div>
							{/each}
							{#if dayTasks.length > 2}
								<div class="text-xs text-muted-foreground">+{dayTasks.length - 2}개 더</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- 이벤트 범례 -->
	<div class="space-y-2">
		<h3 class="font-medium">이번 달 작업 현황</h3>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded bg-gray-500"></div>
				<span>계획됨</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded bg-blue-500"></div>
				<span>진행중</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded bg-green-500"></div>
				<span>완료</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded bg-yellow-500"></div>
				<span>보류</span>
			</div>
		</div>
	</div>

	<!-- 작업 폼 모달 -->
	<TaskFormModal
		open={showTaskForm}
		{projectId}
		task={editingTask}
		onClose={closeTaskForm}
	/>
</div>
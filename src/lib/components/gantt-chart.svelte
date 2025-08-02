<script lang="ts">
	import { projects, deleteTask, getStatusColor, type Task } from '$lib/stores/tasks';
	import TaskFormModal from './task-form-modal.svelte';
	import Button from './ui/button.svelte';
	import { Plus, Edit, Trash2 } from 'lucide-svelte';

	type Props = {
		projectId: string;
	};

	let { projectId }: Props = $props();

	let showTaskForm = $state(false);
	let editingTask = $state<Task | null>(null);

	const currentProject = $derived(() => {
		return $projects.find(p => p.id === projectId);
	});

	const tasks = $derived(() => {
		return currentProject?.tasks || [];
	});

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

	function getPositionStyle(task: Task, index: number) {
		// 간트바 위치 계산 (간단한 예시)
		const left = index * 10;
		const width = 20 + index * 15;
		return `left: ${left}%; width: ${width}%;`;
	}
</script>

<div class="space-y-6">
	<!-- 간트차트 헤더 -->
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-medium">작업 일정</h3>
		<div class="flex items-center gap-2">
			<Button onclick={openAddTask} size="sm" class="gap-2">
				<Plus class="h-4 w-4" />
				작업 추가
			</Button>
			<div class="text-sm text-muted-foreground">2024년 8월 - 9월</div>
		</div>
	</div>

	<!-- 간트차트 그리드 -->
	<div class="border rounded-lg overflow-hidden">
		<!-- 헤더 -->
		<div class="bg-muted border-b">
			<div class="grid grid-cols-12 gap-0">
				<div class="col-span-3 p-3 border-r font-medium">작업명</div>
				<div class="col-span-9 p-3">
					<div class="grid grid-cols-9 gap-0 text-center text-sm">
						<div class="py-1">8/1</div>
						<div class="py-1">8/5</div>
						<div class="py-1">8/10</div>
						<div class="py-1">8/15</div>
						<div class="py-1">8/20</div>
						<div class="py-1">8/25</div>
						<div class="py-1">8/30</div>
						<div class="py-1">9/1</div>
						<div class="py-1">9/5</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 작업 행들 -->
		{#each tasks as task, index}
			<div class="grid grid-cols-12 gap-0 border-b last:border-b-0 hover:bg-muted/50 group">
				<div class="col-span-3 p-3 border-r">
					<div class="flex items-center justify-between">
						<div>
							<div class="font-medium">{task.name}</div>
							<div class="text-sm text-muted-foreground">{task.startDate} ~ {task.endDate}</div>
							<div class="text-xs text-muted-foreground">{task.assignee}</div>
						</div>
						<div class="opacity-0 group-hover:opacity-100 flex gap-1">
							<button
								onclick={() => openEditTask(task)}
								class="p-1 hover:bg-accent rounded-sm"
								title="편집"
							>
								<Edit class="h-3 w-3" />
							</button>
							<button
								onclick={() => handleDeleteTask(task)}
								class="p-1 hover:bg-destructive hover:text-destructive-foreground rounded-sm"
								title="삭제"
							>
								<Trash2 class="h-3 w-3" />
							</button>
						</div>
					</div>
				</div>
				<div class="col-span-9 p-3 relative">
					<div class="grid grid-cols-9 gap-0 h-8 relative">
						<!-- 간트바 -->
						<div class="absolute inset-y-0 flex items-center" style={getPositionStyle(task, index)}>
							<div class="w-full h-4 {task.color || getStatusColor(task.status)} rounded-sm relative overflow-hidden cursor-pointer" onclick={() => openEditTask(task)}>
								<div class="absolute inset-0 bg-white/20" style="width: {task.progress}%"></div>
								<div class="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
									{task.progress}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- 범례 -->
	<div class="flex gap-4 text-sm">
		<div class="flex items-center gap-2">
			<div class="w-3 h-3 bg-gray-500 rounded"></div>
			<span>계획됨</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-3 h-3 bg-blue-500 rounded"></div>
			<span>진행중</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-3 h-3 bg-green-500 rounded"></div>
			<span>완료</span>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-3 h-3 bg-yellow-500 rounded"></div>
			<span>보류</span>
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
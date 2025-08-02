<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronUp, ChevronDown, Search, Plus, Edit, Trash2 } from 'lucide-svelte';
	import Input from './ui/input.svelte';
	import Button from './ui/button.svelte';
	import { projects, deleteTask, getStatusColor, getPriorityColor, type Task } from '$lib/stores/tasks';
	import TaskFormModal from './task-form-modal.svelte';

	type Props = {
		projectId: string;
		searchable?: boolean;
		class?: string;
	};

	let { projectId, searchable = true, class: className }: Props = $props();

	let showTaskForm = $state(false);
	let editingTask = $state<Task | null>(null);

	const currentProject = $derived(() => {
		return $projects.find(p => p.id === projectId);
	});

	const data = $derived(() => {
		return currentProject?.tasks || [];
	});

	const columns = [
		{ key: 'name', label: '작업명', sortable: true, width: '200px' },
		{ key: 'assignee', label: '담당자', sortable: true },
		{ key: 'status', label: '상태', sortable: true },
		{ key: 'priority', label: '우선순위', sortable: true },
		{ key: 'startDate', label: '시작일', sortable: true },
		{ key: 'endDate', label: '종료일', sortable: true },
		{ key: 'progress', label: '진행률(%)', sortable: true },
		{ key: 'actions', label: '작업', sortable: false, width: '100px' }
	];

	let searchTerm = $state('');
	let sortColumn = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');

	const filteredData = $derived(() => {
		let filtered = data;

		// 검색 필터링
		if (searchTerm) {
			filtered = filtered.filter(row =>
				Object.values(row).some(value =>
					String(value).toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}

		// 정렬
		if (sortColumn) {
			filtered = filtered.sort((a, b) => {
				const aVal = a[sortColumn];
				const bVal = b[sortColumn];
				
				if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
				if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
				return 0;
			});
		}

		return filtered;
	});

	function handleSort(columnKey: string) {
		const column = columns.find(col => col.key === columnKey);
		if (!column?.sortable) return;

		if (sortColumn === columnKey) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = columnKey;
			sortDirection = 'asc';
		}
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

	function formatValue(task: Task, key: string): any {
		switch (key) {
			case 'status':
				return getStatusText(task.status);
			case 'priority':
				return getPriorityText(task.priority);
			case 'progress':
				return `${task.progress}%`;
			case 'actions':
				return null; // 별도 렌더링
			default:
				return task[key as keyof Task];
		}
	}

	function getStatusText(status: Task['status']): string {
		switch (status) {
			case 'planned': return '계획됨';
			case 'in-progress': return '진행중';
			case 'completed': return '완료';
			case 'on-hold': return '보류';
			default: return status;
		}
	}

	function getPriorityText(priority: Task['priority']): string {
		switch (priority) {
			case 'high': return '높음';
			case 'medium': return '보통';
			case 'low': return '낮음';
			default: return priority;
		}
	}

	function getStatusBadgeClass(status: Task['status']): string {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			case 'in-progress':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
			case 'planned':
				return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
			case 'on-hold':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
		}
	}
</script>

<div class={cn("space-y-4", className)}>
	<div class="flex items-center justify-between gap-4">
		{#if searchable}
			<div class="relative flex-1 max-w-sm">
				<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					bind:value={searchTerm}
					placeholder="검색..."
					class="pl-10"
				/>
			</div>
		{/if}
		<Button onclick={openAddTask} size="sm" class="gap-2">
			<Plus class="h-4 w-4" />
			작업 추가
		</Button>
	</div>

	<div class="border rounded-lg overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-muted">
					<tr>
						{#each columns as column}
							<th
								class={cn(
									"px-4 py-3 text-left text-sm font-medium text-muted-foreground",
									column.sortable && "cursor-pointer hover:bg-muted/80 select-none",
									column.width && `w-[${column.width}]`
								)}
								onclick={() => handleSort(column.key)}
							>
								<div class="flex items-center gap-2">
									{column.label}
									{#if column.sortable}
										<div class="flex flex-col">
											<ChevronUp 
												class={cn(
													"h-3 w-3 transition-colors",
													sortColumn === column.key && sortDirection === 'asc' 
														? "text-foreground" 
														: "text-muted-foreground/50"
												)} 
											/>
											<ChevronDown 
												class={cn(
													"h-3 w-3 -mt-1 transition-colors",
													sortColumn === column.key && sortDirection === 'desc' 
														? "text-foreground" 
														: "text-muted-foreground/50"
												)} 
											/>
										</div>
									{/if}
								</div>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each filteredData as task, index}
						<tr class={cn(
							"border-t hover:bg-muted/50 transition-colors",
							index % 2 === 0 ? "bg-background" : "bg-muted/20"
						)}>
							{#each columns as column}
								<td class="px-4 py-3 text-sm">
									{#if column.key === 'status'}
										<span class="px-2 py-1 text-xs rounded-full {getStatusBadgeClass(task.status)}">
											{formatValue(task, column.key)}
										</span>
									{:else if column.key === 'priority'}
										<span class={getPriorityColor(task.priority)}>
											{formatValue(task, column.key)}
										</span>
									{:else if column.key === 'progress'}
										<div class="flex items-center gap-2">
											<div class="w-16 bg-secondary rounded-full h-2">
												<div 
													class="bg-primary h-2 rounded-full transition-all"
													style="width: {task.progress}%"
												></div>
											</div>
											<span class="text-xs">{task.progress}%</span>
										</div>
									{:else if column.key === 'actions'}
										<div class="flex gap-1">
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
									{:else}
										{formatValue(task, column.key)}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		
		{#if filteredData.length === 0}
			<div class="text-center py-8 text-muted-foreground">
				<p>데이터가 없습니다.</p>
			</div>
		{/if}
	</div>

	<div class="flex justify-between items-center text-sm text-muted-foreground">
		<p>총 {filteredData.length}개의 항목</p>
		{#if searchTerm}
			<p>"{searchTerm}" 검색 결과</p>
		{/if}
	</div>

	<!-- 작업 폼 모달 -->
	<TaskFormModal
		open={showTaskForm}
		{projectId}
		task={editingTask}
		onClose={closeTaskForm}
	/>
</div>
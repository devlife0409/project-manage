<script lang="ts">
	import Card from './ui/card.svelte';
	import Button from './ui/button.svelte';
	import { AlertTriangle, Clock, TrendingDown, Calendar, User } from 'lucide-svelte';
	import { projectManager } from '$lib/stores/projects';
	import { formatDate } from '$lib/utils/date';
	import type { Task } from '$lib/models/Task';
	import type { Project } from '$lib/models/Project';

	type Props = {
		selectedProjectId?: string;
	};

	let { selectedProjectId }: Props = $props();

	const overdueTasks = $derived(() => {
		return projectManager.getOverdueTasks();
	});

	const todaysTasks = $derived(() => {
		return projectManager.getTodaysTasks();
	});

	const filteredOverdueTasks = $derived(() => {
		if (!selectedProjectId || selectedProjectId === 'all') return overdueTasks;
		return overdueTasks.filter(({ project }) => project.id === selectedProjectId);
	});

	const filteredTodaysTasks = $derived(() => {
		if (!selectedProjectId || selectedProjectId === 'all') return todaysTasks;
		return todaysTasks.filter(({ project }) => project.id === selectedProjectId);
	});

	function getDaysOverdue(task: Task): number {
		const today = new Date();
		const endDate = new Date(task.endDate);
		const diffTime = today.getTime() - endDate.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	function getPriorityColor(priority: string): string {
		switch (priority) {
			case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
			case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
			case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
			default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
		}
	}

	function getTaskStatusColor(status: string): string {
		switch (status) {
			case 'completed': return 'text-green-600';
			case 'in-progress': return 'text-blue-600';
			case 'planned': return 'text-gray-600';
			case 'on-hold': return 'text-yellow-600';
			default: return 'text-gray-600';
		}
	}
</script>

<div class="space-y-6">
	<!-- 지연된 작업 -->
	<Card class="p-6">
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<AlertTriangle class="h-5 w-5 text-red-600" />
					<h3 class="text-lg font-semibold">지연된 작업</h3>
					<span class="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
						{filteredOverdueTasks.length}개
					</span>
				</div>
				{#if filteredOverdueTasks.length > 0}
					<Button variant="outline" size="sm" class="gap-2">
						<TrendingDown class="h-4 w-4" />
						조치 필요
					</Button>
				{/if}
			</div>

			{#if filteredOverdueTasks.length > 0}
				<div class="space-y-3">
					{#each filteredOverdueTasks as { task, project }}
						<div class="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 rounded-lg">
							<div class="flex items-start justify-between mb-2">
								<div class="flex-1">
									<div class="flex items-center gap-2 mb-1">
										<h4 class="font-medium">{task.name}</h4>
										<span class="px-2 py-1 text-xs rounded-full {getPriorityColor(task.priority)}">
											{task.priority === 'high' ? '높음' : task.priority === 'medium' ? '보통' : '낮음'}
										</span>
									</div>
									<p class="text-sm text-muted-foreground mb-2">{project.name}</p>
									<div class="flex items-center gap-4 text-sm text-muted-foreground">
										<div class="flex items-center gap-1">
											<User class="h-3 w-3" />
											<span>{task.assignee}</span>
										</div>
										<div class="flex items-center gap-1">
											<Calendar class="h-3 w-3" />
											<span>마감: {formatDate(task.endDate)}</span>
										</div>
										<div class="flex items-center gap-1 text-red-600">
											<Clock class="h-3 w-3" />
											<span>{getDaysOverdue(task)}일 지연</span>
										</div>
									</div>
								</div>
								<div class="text-right">
									<div class="text-sm font-medium {getTaskStatusColor(task.status)}">
										{task.status === 'in-progress' ? '진행중' : 
										 task.status === 'planned' ? '계획됨' : 
										 task.status === 'on-hold' ? '보류' : '완료'}
									</div>
									<div class="text-xs text-muted-foreground">진행률: {task.progress}%</div>
								</div>
							</div>
							
							<!-- 진행률 바 -->
							<div class="w-full bg-secondary rounded-full h-2">
								<div 
									class="h-2 rounded-full bg-red-500"
									style="width: {task.progress}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="text-center py-8 text-muted-foreground">
					<AlertTriangle class="h-12 w-12 mx-auto mb-2 opacity-50" />
					<h4 class="font-medium mb-1">지연된 작업이 없습니다</h4>
					<p class="text-sm">모든 작업이 일정대로 진행되고 있습니다</p>
				</div>
			{/if}
		</div>
	</Card>

	<!-- 오늘 진행 작업 -->
	<Card class="p-6">
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Calendar class="h-5 w-5 text-blue-600" />
					<h3 class="text-lg font-semibold">오늘 진행 작업</h3>
					<span class="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
						{filteredTodaysTasks.length}개
					</span>
				</div>
			</div>

			{#if filteredTodaysTasks.length > 0}
				<div class="space-y-3">
					{#each filteredTodaysTasks as { task, project }}
						<div class="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
							<div class="flex items-start justify-between mb-2">
								<div class="flex-1">
									<div class="flex items-center gap-2 mb-1">
										<h4 class="font-medium">{task.name}</h4>
										<span class="px-2 py-1 text-xs rounded-full {getPriorityColor(task.priority)}">
											{task.priority === 'high' ? '높음' : task.priority === 'medium' ? '보통' : '낮음'}
										</span>
									</div>
									<p class="text-sm text-muted-foreground mb-2">{project.name}</p>
									<div class="flex items-center gap-4 text-sm text-muted-foreground">
										<div class="flex items-center gap-1">
											<User class="h-3 w-3" />
											<span>{task.assignee}</span>
										</div>
										<div class="flex items-center gap-1">
											<Calendar class="h-3 w-3" />
											<span>{formatDate(task.startDate)} ~ {formatDate(task.endDate)}</span>
										</div>
									</div>
								</div>
								<div class="text-right">
									<div class="text-sm font-medium {getTaskStatusColor(task.status)}">
										{task.status === 'in-progress' ? '진행중' : 
										 task.status === 'planned' ? '계획됨' : 
										 task.status === 'on-hold' ? '보류' : '완료'}
									</div>
									<div class="text-xs text-muted-foreground">진행률: {task.progress}%</div>
								</div>
							</div>
							
							<!-- 진행률 바 -->
							<div class="w-full bg-secondary rounded-full h-2">
								<div 
									class="h-2 rounded-full bg-blue-500"
									style="width: {task.progress}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="text-center py-8 text-muted-foreground">
					<Calendar class="h-12 w-12 mx-auto mb-2 opacity-50" />
					<h4 class="font-medium mb-1">오늘 진행할 작업이 없습니다</h4>
					<p class="text-sm">새로운 작업을 시작하거나 기존 작업을 확인해보세요</p>
				</div>
			{/if}
		</div>
	</Card>

	<!-- 작업 통계 요약 -->
	<Card class="p-6">
		<div class="space-y-4">
			<h3 class="text-lg font-semibold flex items-center gap-2">
				<TrendingDown class="h-5 w-5 text-orange-600" />
				이슈 요약
			</h3>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
					<div class="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
					<div class="text-sm text-red-700">지연된 작업</div>
					<div class="text-xs text-muted-foreground mt-1">즉시 조치 필요</div>
				</div>

				<div class="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
					<div class="text-2xl font-bold text-yellow-600">
						{overdueTasks.filter(({task}) => task.priority === 'high').length}
					</div>
					<div class="text-sm text-yellow-700">고우선순위 지연</div>
					<div class="text-xs text-muted-foreground mt-1">긴급 대응 필요</div>
				</div>

				<div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
					<div class="text-2xl font-bold text-blue-600">{todaysTasks.length}</div>
					<div class="text-sm text-blue-700">오늘 진행 작업</div>
					<div class="text-xs text-muted-foreground mt-1">일일 목표</div>
				</div>
			</div>
		</div>
	</Card>
</div>
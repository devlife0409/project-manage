<script lang="ts">
	import Card from './ui/card.svelte';
	import Button from './ui/button.svelte';
	import { ChevronDown, ChevronUp, AlertTriangle, Clock, CheckCircle, Users, Calendar, TrendingUp } from 'lucide-svelte';
	import type { Project } from '$lib/models/Project';
	import { formatDate } from '$lib/utils/date';

	type Props = {
		project: Project;
		reportPeriod: 'week' | 'month' | 'quarter';
	};

	let { project, reportPeriod }: Props = $props();

	let isExpanded = $state(false);

	const stats = $derived(project.getStats());
	const progress = $derived(project.getOverallProgress());
	const overdueTasks = $derived(project.tasks.filter(t => t.isOverdue()));
	const todaysTasks = $derived(project.tasks.filter(t => t.isToday()));
	const daysUntilDeadline = $derived(project.getDaysUntilDeadline());

	function getStatusColor(status: string): string {
		switch (status) {
			case '완료': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
			case '진행중': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
			case '계획중': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
			case '보류': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
			default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
		}
	}

	function getProgressBarColor(progress: number): string {
		if (progress >= 80) return 'bg-green-500';
		if (progress >= 60) return 'bg-blue-500';
		if (progress >= 40) return 'bg-yellow-500';
		return 'bg-red-500';
	}

	function getHealthStatus(): { status: string; color: string; icon: any } {
		if (overdueTasks.length > 0) {
			return { status: '주의필요', color: 'text-red-600', icon: AlertTriangle };
		}
		if (progress >= 80) {
			return { status: '양호', color: 'text-green-600', icon: CheckCircle };
		}
		if (progress >= 60) {
			return { status: '보통', color: 'text-blue-600', icon: TrendingUp };
		}
		return { status: '관리필요', color: 'text-yellow-600', icon: Clock };
	}

	const healthStatus = $derived(getHealthStatus());
</script>

<Card class="overflow-hidden">
	<div class="p-6">
		<!-- 프로젝트 헤더 -->
		<div class="flex items-center justify-between mb-6">
			<div class="flex items-center gap-4">
				<div>
					<h3 class="text-xl font-semibold">{project.name}</h3>
					<p class="text-muted-foreground">{project.description}</p>
				</div>
				<div class="flex items-center gap-2">
					<span class="px-3 py-1 text-xs font-medium rounded-full {getStatusColor(project.status)}">
						{project.status}
					</span>
					<div class="flex items-center gap-1 {healthStatus.color}">
						<svelte:component this={healthStatus.icon} class="h-4 w-4" />
						<span class="text-sm font-medium">{healthStatus.status}</span>
					</div>
				</div>
			</div>
			
			<Button 
				variant="ghost" 
				size="sm" 
				onclick={() => isExpanded = !isExpanded}
				class="gap-2"
			>
				{isExpanded ? '간단히' : '자세히'}
				{#if isExpanded}
					<ChevronUp class="h-4 w-4" />
				{:else}
					<ChevronDown class="h-4 w-4" />
				{/if}
			</Button>
		</div>

		<!-- 핵심 지표 -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<div class="text-center space-y-2">
				<div class="text-2xl font-bold">{progress}%</div>
				<div class="text-xs text-muted-foreground">전체 진행률</div>
				<div class="w-full bg-secondary rounded-full h-2">
					<div 
						class="h-2 rounded-full transition-all {getProgressBarColor(progress)}"
						style="width: {progress}%"
					></div>
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="text-2xl font-bold">{stats.completedTasks}/{stats.totalTasks}</div>
				<div class="text-xs text-muted-foreground">완료된 작업</div>
				<div class="text-sm {stats.totalTasks > 0 ? 'text-green-600' : 'text-muted-foreground'}">
					{stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}% 완료
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="text-2xl font-bold">{stats.totalMembers}</div>
				<div class="text-xs text-muted-foreground">팀원 수</div>
				<div class="text-sm text-muted-foreground">
					{Object.keys(stats.departmentCounts).length}개 부서
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="text-2xl font-bold {overdueTasks.length > 0 ? 'text-red-600' : 'text-green-600'}">
					{overdueTasks.length}
				</div>
				<div class="text-xs text-muted-foreground">지연 작업</div>
				{#if daysUntilDeadline !== null}
					<div class="text-sm {daysUntilDeadline < 7 ? 'text-red-600' : 'text-muted-foreground'}">
						{daysUntilDeadline > 0 ? `${daysUntilDeadline}일 남음` : '마감 경과'}
					</div>
				{/if}
			</div>
		</div>

		<!-- 확장 정보 -->
		{#if isExpanded}
			<div class="space-y-6 pt-6 border-t">
				<!-- 작업 상태 분포 -->
				<div>
					<h4 class="font-medium mb-3 flex items-center gap-2">
						<CheckCircle class="h-4 w-4" />
						작업 상태 분포
					</h4>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div class="flex items-center justify-between p-3 bg-muted rounded-lg">
							<div>
								<div class="text-sm text-muted-foreground">계획됨</div>
								<div class="text-lg font-semibold">{stats.plannedTasks}</div>
							</div>
							<div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
								<Clock class="h-4 w-4 text-white" />
							</div>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-muted rounded-lg">
							<div>
								<div class="text-sm text-muted-foreground">진행중</div>
								<div class="text-lg font-semibold">{stats.inProgressTasks}</div>
							</div>
							<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
								<TrendingUp class="h-4 w-4 text-white" />
							</div>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-muted rounded-lg">
							<div>
								<div class="text-sm text-muted-foreground">완료</div>
								<div class="text-lg font-semibold">{stats.completedTasks}</div>
							</div>
							<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
								<CheckCircle class="h-4 w-4 text-white" />
							</div>
						</div>
						
						<div class="flex items-center justify-between p-3 bg-muted rounded-lg">
							<div>
								<div class="text-sm text-muted-foreground">보류</div>
								<div class="text-lg font-semibold">{stats.onHoldTasks}</div>
							</div>
							<div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
								<AlertTriangle class="h-4 w-4 text-white" />
							</div>
						</div>
					</div>
				</div>

				<!-- 이슈 및 위험 요소 -->
				{#if overdueTasks.length > 0 || todaysTasks.length > 0}
					<div>
						<h4 class="font-medium mb-3 flex items-center gap-2">
							<AlertTriangle class="h-4 w-4" />
							주의사항 및 이슈
						</h4>
						<div class="space-y-3">
							{#if overdueTasks.length > 0}
								<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
									<div class="flex items-center gap-2 mb-2">
										<AlertTriangle class="h-4 w-4 text-red-600" />
										<span class="font-medium text-red-800 dark:text-red-200">지연된 작업 ({overdueTasks.length}개)</span>
									</div>
									<div class="space-y-1">
										{#each overdueTasks.slice(0, 3) as task}
											<div class="text-sm text-red-700 dark:text-red-300">
												• {task.name} (담당: {task.assignee}, 마감: {formatDate(task.endDate)})
											</div>
										{/each}
										{#if overdueTasks.length > 3}
											<div class="text-sm text-red-600">... 및 {overdueTasks.length - 3}개 더</div>
										{/if}
									</div>
								</div>
							{/if}

							{#if todaysTasks.length > 0}
								<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
									<div class="flex items-center gap-2 mb-2">
										<Calendar class="h-4 w-4 text-blue-600" />
										<span class="font-medium text-blue-800 dark:text-blue-200">오늘 진행 작업 ({todaysTasks.length}개)</span>
									</div>
									<div class="space-y-1">
										{#each todaysTasks.slice(0, 3) as task}
											<div class="text-sm text-blue-700 dark:text-blue-300">
												• {task.name} (담당: {task.assignee}, 진행률: {task.progress}%)
											</div>
										{/each}
										{#if todaysTasks.length > 3}
											<div class="text-sm text-blue-600">... 및 {todaysTasks.length - 3}개 더</div>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				<!-- 팀원 분포 -->
				{#if project.members.length > 0}
					<div>
						<h4 class="font-medium mb-3 flex items-center gap-2">
							<Users class="h-4 w-4" />
							팀 구성
						</h4>
						<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
							{#each Object.entries(stats.departmentCounts) as [dept, count]}
								<div class="flex items-center justify-between p-3 bg-muted rounded-lg">
									<div>
										<div class="text-sm text-muted-foreground">{dept}</div>
										<div class="text-lg font-semibold">{count}명</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</Card>
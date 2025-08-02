<script lang="ts">
	import { projectManager } from '$lib/stores/projects';
	import Card from '$lib/components/ui/card.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { BarChart3, TrendingUp, AlertTriangle, Calendar, Download, Filter } from 'lucide-svelte';

	const projects = $derived(projectManager.projects);
	const overallStats = $derived(projectManager.getOverallStats());

	let selectedProjectId = $state<string | 'all'>('all');
	let reportPeriod = $state<'week' | 'month' | 'quarter'>('month');

	function exportReport() {
		const data = {
			generatedAt: new Date().toISOString(),
			period: reportPeriod,
			overallStats,
			projects: projects.map(p => ({
				id: p.id,
				name: p.name,
				stats: p.getStats(),
				progress: p.getOverallProgress()
			}))
		};
		
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `project-report-${new Date().toISOString().split('T')[0]}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	const filteredProjects = $derived((() => {
		if (selectedProjectId === 'all') return projects;
		return projects.filter(p => p.id === selectedProjectId);
	})());
</script>

<svelte:head>
	<title>프로젝트 보고서 - Project Manager</title>
</svelte:head>

<div class="p-6 space-y-6">
	<!-- 페이지 헤더 -->
	<div class="flex items-center justify-between">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold flex items-center gap-3">
				<BarChart3 class="h-8 w-8 text-purple-500" />
				프로젝트 보고서
			</h1>
			<p class="text-muted-foreground">
				프로젝트별 진행 상황과 성과 지표를 한눈에 확인하세요
			</p>
		</div>
		
		<div class="flex items-center gap-3">
			<!-- 필터 및 기간 선택 -->
			<div class="flex items-center gap-2">
				<Filter class="h-4 w-4 text-muted-foreground" />
				<select
					bind:value={selectedProjectId}
					class="px-3 py-2 border rounded-md text-sm"
				>
					<option value="all">모든 프로젝트</option>
					{#each projects as project}
						<option value={project.id}>{project.name}</option>
					{/each}
				</select>
			</div>
			
			<div class="flex items-center gap-2">
				<Calendar class="h-4 w-4 text-muted-foreground" />
				<select
					bind:value={reportPeriod}
					class="px-3 py-2 border rounded-md text-sm"
				>
					<option value="week">최근 1주</option>
					<option value="month">최근 1개월</option>
					<option value="quarter">최근 3개월</option>
				</select>
			</div>
			
			<Button onclick={exportReport} variant="outline" class="gap-2">
				<Download class="h-4 w-4" />
				내보내기
			</Button>
		</div>
	</div>

	<!-- 디버그 정보 -->
	<Card class="p-4 bg-blue-50 dark:bg-blue-900/20">
		<h3 class="font-semibold mb-2">데이터 확인</h3>
		<div class="space-y-2 text-sm">
			<p>프로젝트 수: {projects.length}</p>
			<p>활성 프로젝트: {overallStats.activeProjects}</p>
			<p>총 작업 수: {overallStats.totalTasks}</p>
			<p>완료 작업 수: {overallStats.completedTasks}</p>
			<p>총 팀원 수: {overallStats.totalMembers}</p>
		</div>
	</Card>

	<!-- 주요 지표 카드 -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
					<BarChart3 class="h-5 w-5 text-blue-600 dark:text-blue-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">활성 프로젝트</p>
					<p class="text-2xl font-bold">{overallStats.activeProjects}</p>
				</div>
			</div>
		</Card>

		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
					<TrendingUp class="h-5 w-5 text-green-600 dark:text-green-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">평균 진행률</p>
					<p class="text-2xl font-bold">{overallStats.averageProgress}%</p>
				</div>
			</div>
		</Card>

		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
					<BarChart3 class="h-5 w-5 text-purple-600 dark:text-purple-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">완료된 작업</p>
					<p class="text-2xl font-bold">{overallStats.completedTasks}</p>
				</div>
			</div>
		</Card>

		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
					<AlertTriangle class="h-5 w-5 text-orange-600 dark:text-orange-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">지연 위험</p>
					<p class="text-2xl font-bold">
						{projectManager.getOverdueTasks().length}
					</p>
				</div>
			</div>
		</Card>
	</div>

	<!-- 프로젝트 목록 -->
	<Card class="p-6">
		<h2 class="text-xl font-semibold mb-4">프로젝트 목록</h2>
		<div class="space-y-4">
			{#each filteredProjects as project}
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<div>
							<h3 class="font-semibold">{project.name}</h3>
							<p class="text-sm text-muted-foreground">{project.description}</p>
							<p class="text-xs text-muted-foreground mt-1">상태: {project.status}</p>
						</div>
						<div class="text-right">
							<div class="text-lg font-bold">{project.getOverallProgress()}%</div>
							<div class="text-sm text-muted-foreground">
								{project.getStats().completedTasks}/{project.getStats().totalTasks} 작업 완료
							</div>
							<div class="text-xs text-muted-foreground">
								팀원 {project.members.length}명
							</div>
						</div>
					</div>
					
					<!-- 진행률 바 -->
					<div class="mt-3 w-full bg-secondary rounded-full h-2">
						<div 
							class="h-2 rounded-full bg-blue-500 transition-all"
							style="width: {project.getOverallProgress()}%"
						></div>
					</div>
				</div>
			{/each}

			{#if filteredProjects.length === 0}
				<div class="text-center py-8 text-muted-foreground">
					<BarChart3 class="h-16 w-16 mx-auto mb-4 opacity-50" />
					<p>선택된 프로젝트가 없습니다.</p>
				</div>
			{/if}
		</div>
	</Card>
</div>
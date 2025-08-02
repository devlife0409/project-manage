<script lang="ts">
	import Card from '$lib/components/ui/card.svelte';
	import { FolderOpen, Users, Calendar, TrendingUp } from 'lucide-svelte';

	const stats = [
		{ title: '진행 중인 프로젝트', value: '12', icon: FolderOpen, color: 'text-blue-600' },
		{ title: '팀 멤버', value: '8', icon: Users, color: 'text-green-600' },
		{ title: '이번 주 일정', value: '24', icon: Calendar, color: 'text-orange-600' },
		{ title: '완료율', value: '84%', icon: TrendingUp, color: 'text-purple-600' }
	];

	const recentProjects = [
		{ name: '웹사이트 리뉴얼', status: '진행중', progress: 75 },
		{ name: '모바일 앱 개발', status: '진행중', progress: 45 },
		{ name: 'API 서버 구축', status: '완료', progress: 100 },
		{ name: 'UI 디자인 시스템', status: '대기', progress: 20 }
	];
</script>

<div class="p-6 space-y-6">
	<div>
		<h1 class="text-3xl font-bold">대시보드</h1>
		<p class="text-muted-foreground">프로젝트 현황을 한눈에 확인하세요</p>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		{#each stats as stat}
			<Card class="p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-muted-foreground">{stat.title}</p>
						<p class="text-2xl font-bold">{stat.value}</p>
					</div>
					<svelte:component this={stat.icon} class="h-8 w-8 {stat.color}" />
				</div>
			</Card>
		{/each}
	</div>

	<!-- Recent Projects -->
	<Card class="p-6">
		<h2 class="text-xl font-semibold mb-4">최근 프로젝트</h2>
		<div class="space-y-4">
			{#each recentProjects as project}
				<div class="flex items-center justify-between p-4 border rounded-lg">
					<div class="flex-1">
						<h3 class="font-medium">{project.name}</h3>
						<p class="text-sm text-muted-foreground">{project.status}</p>
					</div>
					<div class="flex items-center gap-4">
						<div class="w-32 bg-secondary rounded-full h-2">
							<div 
								class="bg-primary h-2 rounded-full transition-all"
								style="width: {project.progress}%"
							></div>
						</div>
						<span class="text-sm font-medium w-12">{project.progress}%</span>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</div>
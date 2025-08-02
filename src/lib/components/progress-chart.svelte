<script lang="ts">
	import Card from './ui/card.svelte';
	import { TrendingUp } from 'lucide-svelte';
	import type { Project } from '$lib/models/Project';

	type Props = {
		projects: Project[];
		title?: string;
	};

	let { projects, title = "프로젝트 진행률" }: Props = $props();

	const chartData = $derived(() => {
		return projects.map(project => ({
			name: project.name,
			progress: project.getOverallProgress(),
			status: project.status,
			completedTasks: project.getStats().completedTasks,
			totalTasks: project.getStats().totalTasks
		}));
	});

	function getProgressColor(progress: number): string {
		if (progress >= 80) return 'bg-green-500';
		if (progress >= 60) return 'bg-blue-500';
		if (progress >= 40) return 'bg-yellow-500';
		return 'bg-red-500';
	}

	function getProgressTextColor(progress: number): string {
		if (progress >= 80) return 'text-green-600';
		if (progress >= 60) return 'text-blue-600';
		if (progress >= 40) return 'text-yellow-600';
		return 'text-red-600';
	}
</script>

<Card class="p-6">
	<div class="space-y-4">
		<div class="flex items-center gap-2">
			<TrendingUp class="h-5 w-5 text-primary" />
			<h3 class="text-lg font-semibold">{title}</h3>
		</div>

		<div class="space-y-4">
			{#each chartData as item}
				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<span class="font-medium text-sm">{item.name}</span>
							<span class="text-xs text-muted-foreground">
								({item.completedTasks}/{item.totalTasks} 작업)
							</span>
						</div>
						<span class="font-semibold {getProgressTextColor(item.progress)}">
							{item.progress}%
						</span>
					</div>
					
					<div class="relative">
						<div class="w-full bg-secondary rounded-full h-3">
							<div 
								class="h-3 rounded-full transition-all duration-500 {getProgressColor(item.progress)}"
								style="width: {item.progress}%"
							></div>
						</div>
						
						<!-- 진행률에 따른 마커 표시 -->
						<div class="flex justify-between text-xs text-muted-foreground mt-1">
							<span>0%</span>
							<span>25%</span>
							<span>50%</span>
							<span>75%</span>
							<span>100%</span>
						</div>
					</div>
				</div>
			{/each}

			{#if chartData.length === 0}
				<div class="text-center py-8 text-muted-foreground">
					<TrendingUp class="h-12 w-12 mx-auto mb-2 opacity-50" />
					<p>표시할 프로젝트가 없습니다</p>
				</div>
			{/if}
		</div>

		<!-- 범례 -->
		<div class="pt-4 border-t">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 bg-red-500 rounded"></div>
					<span>0-39% (주의)</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 bg-yellow-500 rounded"></div>
					<span>40-59% (보통)</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 bg-blue-500 rounded"></div>
					<span>60-79% (양호)</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 bg-green-500 rounded"></div>
					<span>80-100% (우수)</span>
				</div>
			</div>
		</div>
	</div>
</Card>
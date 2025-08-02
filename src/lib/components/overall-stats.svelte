<script lang="ts">
	import Card from './ui/card.svelte';
	import { TrendingUp, Users, Clock, CheckCircle, AlertCircle, Target } from 'lucide-svelte';

	type Props = {
		stats: {
			totalProjects: number;
			activeProjects: number;
			completedProjects: number;
			totalTasks: number;
			completedTasks: number;
			totalMembers: number;
			averageProgress: number;
		};
	};

	let { stats }: Props = $props();

	const completionRate = $derived(() => {
		return stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;
	});

	const projectCompletionRate = $derived(() => {
		return stats.totalProjects > 0 ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0;
	});
</script>

<Card class="p-6">
	<div class="space-y-6">
		<div>
			<h2 class="text-xl font-semibold mb-2">전체 현황 대시보드</h2>
			<p class="text-muted-foreground">모든 프로젝트의 통합 성과 지표</p>
		</div>

		<!-- 주요 지표 그리드 -->
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
			<div class="text-center space-y-2">
				<div class="flex justify-center">
					<div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
						<Target class="h-6 w-6 text-blue-600 dark:text-blue-400" />
					</div>
				</div>
				<div>
					<p class="text-2xl font-bold">{stats.totalProjects}</p>
					<p class="text-xs text-muted-foreground">총 프로젝트</p>
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="flex justify-center">
					<div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
						<TrendingUp class="h-6 w-6 text-green-600 dark:text-green-400" />
					</div>
				</div>
				<div>
					<p class="text-2xl font-bold">{stats.activeProjects}</p>
					<p class="text-xs text-muted-foreground">진행중</p>
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="flex justify-center">
					<div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
						<CheckCircle class="h-6 w-6 text-purple-600 dark:text-purple-400" />
					</div>
				</div>
				<div>
					<p class="text-2xl font-bold">{stats.completedProjects}</p>
					<p class="text-xs text-muted-foreground">완료</p>
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="flex justify-center">
					<div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
						<Clock class="h-6 w-6 text-orange-600 dark:text-orange-400" />
					</div>
				</div>
				<div>
					<p class="text-2xl font-bold">{stats.totalTasks}</p>
					<p class="text-xs text-muted-foreground">총 작업</p>
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="flex justify-center">
					<div class="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
						<CheckCircle class="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
					</div>
				</div>
				<div>
					<p class="text-2xl font-bold">{stats.completedTasks}</p>
					<p class="text-xs text-muted-foreground">완료 작업</p>
				</div>
			</div>

			<div class="text-center space-y-2">
				<div class="flex justify-center">
					<div class="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg">
						<Users class="h-6 w-6 text-pink-600 dark:text-pink-400" />
					</div>
				</div>
				<div>
					<p class="text-2xl font-bold">{stats.totalMembers}</p>
					<p class="text-xs text-muted-foreground">팀원</p>
				</div>
			</div>
		</div>

		<!-- 진행률 표시 -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="text-center space-y-3">
				<h3 class="font-medium">평균 프로젝트 진행률</h3>
				<div class="relative">
					<div class="w-20 h-20 mx-auto">
						<svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-dasharray="100, 100"
								class="text-muted"
							/>
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-dasharray="{stats.averageProgress}, 100"
								class="text-blue-600 dark:text-blue-400"
							/>
						</svg>
					</div>
					<div class="absolute inset-0 flex items-center justify-center">
						<span class="text-xl font-bold">{stats.averageProgress}%</span>
					</div>
				</div>
			</div>

			<div class="text-center space-y-3">
				<h3 class="font-medium">작업 완료율</h3>
				<div class="relative">
					<div class="w-20 h-20 mx-auto">
						<svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-dasharray="100, 100"
								class="text-muted"
							/>
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-dasharray="{completionRate}, 100"
								class="text-green-600 dark:text-green-400"
							/>
						</svg>
					</div>
					<div class="absolute inset-0 flex items-center justify-center">
						<span class="text-xl font-bold">{completionRate}%</span>
					</div>
				</div>
			</div>

			<div class="text-center space-y-3">
				<h3 class="font-medium">프로젝트 완료율</h3>
				<div class="relative">
					<div class="w-20 h-20 mx-auto">
						<svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-dasharray="100, 100"
								class="text-muted"
							/>
							<path
								d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-dasharray="{projectCompletionRate}, 100"
								class="text-purple-600 dark:text-purple-400"
							/>
						</svg>
					</div>
					<div class="absolute inset-0 flex items-center justify-center">
						<span class="text-xl font-bold">{projectCompletionRate}%</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 상태별 요약 -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
			<div class="flex items-center gap-3">
				<div class="w-3 h-3 bg-blue-500 rounded-full"></div>
				<div>
					<p class="text-sm font-medium">계획됨</p>
					<p class="text-xs text-muted-foreground">새로운 작업</p>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-3 h-3 bg-orange-500 rounded-full"></div>
				<div>
					<p class="text-sm font-medium">진행중</p>
					<p class="text-xs text-muted-foreground">활발한 작업</p>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-3 h-3 bg-green-500 rounded-full"></div>
				<div>
					<p class="text-sm font-medium">완료</p>
					<p class="text-xs text-muted-foreground">성공적 완료</p>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-3 h-3 bg-red-500 rounded-full"></div>
				<div>
					<p class="text-sm font-medium">보류/지연</p>
					<p class="text-xs text-muted-foreground">주의 필요</p>
				</div>
			</div>
		</div>
	</div>
</Card>
<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/stores/tasks';
	import Card from '$lib/components/ui/card.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { Users, ArrowRight } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	// URL에서 프로젝트 ID 가져오기 (쿼리 파라미터)
	const projectId = $page.url.searchParams.get('project') || '1'; // 기본값으로 첫 번째 프로젝트

	const currentProject = $derived($projects.find(p => p.id === projectId));

	const allProjects = $derived($projects);

	function selectProject(id: string) {
		goto(`/dashboard/team?project=${id}`);
	}
</script>

<svelte:head>
	<title>팀 관리 - Project Manager</title>
</svelte:head>

<div class="p-6 space-y-6">
	<!-- 페이지 헤더 -->
	<div class="space-y-2">
		<h1 class="text-3xl font-bold flex items-center gap-3">
			<Users class="h-8 w-8 text-blue-500" />
			팀 관리
		</h1>
		<p class="text-muted-foreground">프로젝트별 팀원을 관리하고 협업을 효율적으로 진행하세요</p>
	</div>

	<!-- 프로젝트 선택 -->
	<Card class="p-4">
		<div class="space-y-4">
			<h2 class="text-lg font-semibold">프로젝트 선택</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each allProjects as project}
					<button
						onclick={() => selectProject(project.id)}
						class="p-4 border rounded-lg text-left hover:bg-accent transition-colors {projectId === project.id ? 'border-primary bg-accent' : ''}"
					>
						<div class="flex items-center justify-between">
							<div>
								<h3 class="font-medium">{project.name}</h3>
								<p class="text-sm text-muted-foreground">{project.description}</p>
								<p class="text-xs text-muted-foreground mt-2">
									팀원 {project.members?.length || 0}명 · 작업 {project.tasks.length}개
								</p>
							</div>
							<ArrowRight class="h-4 w-4 text-muted-foreground" />
						</div>
					</button>
				{/each}
			</div>
		</div>
	</Card>

	<!-- 선택된 프로젝트의 팀원 관리 -->
	{#if currentProject}
		<Card class="p-6">
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<h2 class="text-xl font-semibold">{currentProject.name}</h2>
						<p class="text-muted-foreground">{currentProject.description}</p>
					</div>
					<div class="text-sm text-muted-foreground">
						상태: <span class="font-medium">{currentProject.status}</span>
					</div>
				</div>
			</div>
		</Card>

		<!-- 임시로 TeamManagement 컴포넌트 대신 간단한 팀원 목록 표시 -->
		<Card class="p-6">
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-semibold">팀원 목록</h3>
					<Button class="gap-2">
						<Users class="h-4 w-4" />
						팀원 추가
					</Button>
				</div>
				
				{#if currentProject.members && currentProject.members.length > 0}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each currentProject.members as member}
							<div class="p-4 border rounded-lg">
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
										{member.name.charAt(0)}
									</div>
									<div>
										<h4 class="font-medium">{member.name}</h4>
										<p class="text-sm text-muted-foreground">{member.role}</p>
										<p class="text-xs text-muted-foreground">{member.email}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="text-center py-8 text-muted-foreground">
						<Users class="h-16 w-16 mx-auto mb-4" />
						<p>아직 팀원이 없습니다.</p>
						<p class="text-sm">첫 번째 팀원을 추가해보세요!</p>
					</div>
				{/if}
			</div>
		</Card>
	{:else}
		<Card class="p-8">
			<div class="text-center space-y-4">
				<Users class="h-16 w-16 mx-auto text-muted-foreground" />
				<div>
					<h3 class="text-lg font-semibold">프로젝트를 선택하세요</h3>
					<p class="text-muted-foreground">팀원을 관리할 프로젝트를 선택해주세요</p>
				</div>
			</div>
		</Card>
	{/if}
</div>
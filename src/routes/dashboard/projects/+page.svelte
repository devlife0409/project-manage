<script lang="ts">
	import Card from '$lib/components/ui/card.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import ProjectViewModal from '$lib/components/project-view-modal.svelte';
	import { Plus, Calendar, Users } from 'lucide-svelte';

	const projects = [
		{
			id: 1,
			name: '웹사이트 리뉴얼',
			description: '회사 웹사이트를 새로운 디자인으로 리뉴얼',
			status: '진행중',
			dueDate: '2024-03-15',
			members: 5,
			progress: 75
		},
		{
			id: 2,
			name: '모바일 앱 개발',
			description: 'iOS/Android 앱 개발 프로젝트',
			status: '진행중',
			dueDate: '2024-04-20',
			members: 3,
			progress: 45
		},
		{
			id: 3,
			name: 'API 서버 구축',
			description: 'RESTful API 서버 구축 및 배포',
			status: '완료',
			dueDate: '2024-02-28',
			members: 4,
			progress: 100
		}
	];

	let selectedProject = $state<{id: number, name: string} | null>(null);
	let showModal = $state(false);

	function handleProjectClick(project: typeof projects[0]) {
		selectedProject = { id: project.id, name: project.name };
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedProject = null;
	}

	function getStatusColor(status: string) {
		switch (status) {
			case '완료':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			case '진행중':
				return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
			case '대기':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
		}
	}
</script>

<div class="p-6 space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">프로젝트</h1>
			<p class="text-muted-foreground">모든 프로젝트를 관리하세요</p>
		</div>
		<Button class="gap-2">
			<Plus class="h-4 w-4" />
			새 프로젝트
		</Button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each projects as project}
			<Card class="p-6 hover:shadow-md transition-shadow cursor-pointer" onclick={() => handleProjectClick(project)}>
				<div class="space-y-4">
					<div class="flex items-start justify-between">
						<h3 class="text-lg font-semibold">{project.name}</h3>
						<span class="px-2 py-1 text-xs rounded-full {getStatusColor(project.status)}">
							{project.status}
						</span>
					</div>
					
					<p class="text-sm text-muted-foreground">{project.description}</p>
					
					<div class="space-y-2">
						<div class="flex items-center gap-2 text-sm">
							<Calendar class="h-4 w-4" />
							<span>마감: {project.dueDate}</span>
						</div>
						<div class="flex items-center gap-2 text-sm">
							<Users class="h-4 w-4" />
							<span>{project.members}명</span>
						</div>
					</div>
					
					<div class="space-y-2">
						<div class="flex justify-between text-sm">
							<span>진행률</span>
							<span>{project.progress}%</span>
						</div>
						<div class="w-full bg-secondary rounded-full h-2">
							<div 
								class="bg-primary h-2 rounded-full transition-all"
								style="width: {project.progress}%"
							></div>
						</div>
					</div>
				</div>
			</Card>
		{/each}
	</div>

	{#if selectedProject}
		<ProjectViewModal 
			open={showModal} 
			projectId={selectedProject.id}
			projectName={selectedProject.name}
			onClose={closeModal}
		/>
	{/if}
</div>
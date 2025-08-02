<script lang="ts">
	import { goto } from '$app/navigation';
	import Dialog from './ui/dialog.svelte';
	import Button from './ui/button.svelte';
	import { BarChart3, Calendar, Table } from 'lucide-svelte';

	type Props = {
		open: boolean;
		projectId: number;
		projectName: string;
		onClose: () => void;
	};

	let { open, projectId, projectName, onClose }: Props = $props();

	function handleViewSelect(viewType: 'gantt' | 'calendar' | 'table') {
		goto(`/dashboard/projects/${projectId}/${viewType}`);
		onClose();
	}

	const viewOptions = [
		{
			type: 'gantt' as const,
			title: '간트차트로 보기',
			description: '프로젝트 일정을 타임라인으로 확인',
			icon: BarChart3,
			color: 'text-blue-500'
		},
		{
			type: 'calendar' as const,
			title: '캘린더로 보기',
			description: '달력 형태로 일정 확인',
			icon: Calendar,
			color: 'text-green-500'
		},
		{
			type: 'table' as const,
			title: '테이블로 보기',
			description: '상세 정보를 표 형태로 확인',
			icon: Table,
			color: 'text-purple-500'
		}
	];
</script>

<Dialog {open} {onClose}>
	<div class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-lg font-semibold">{projectName}</h2>
			<p class="text-sm text-muted-foreground">보기 방식을 선택하세요</p>
		</div>
		
		<div class="grid gap-3">
			{#each viewOptions as option}
				<Button
					variant="outline"
					class="h-auto p-4 justify-start"
					onclick={() => handleViewSelect(option.type)}
				>
					<div class="flex items-center gap-3 w-full">
						<svelte:component this={option.icon} class="h-5 w-5 {option.color}" />
						<div class="text-left">
							<div class="font-medium">{option.title}</div>
							<div class="text-sm text-muted-foreground">{option.description}</div>
						</div>
					</div>
				</Button>
			{/each}
		</div>
	</div>
</Dialog>
<script lang="ts">
	import Dialog from './ui/dialog.svelte';
	import Button from './ui/button.svelte';
	import Input from './ui/input.svelte';
	import Label from './ui/label.svelte';
	import { addTask, updateTask, projects, type Task } from '$lib/stores/tasks';

	type Props = {
		open: boolean;
		projectId: string;
		task?: Task | null;
		onClose: () => void;
	};

	let { open, projectId, task = null, onClose }: Props = $props();

	let formData = $state({
		name: '',
		description: '',
		assignee: '',
		status: 'planned' as Task['status'],
		priority: 'medium' as Task['priority'],
		startDate: '',
		endDate: '',
		progress: 0
	});

	const currentProject = $derived(() => {
		return $projects.find(p => p.id === projectId);
	});

	const teamMembers = $derived(() => {
		return currentProject?.members || [];
	});

	// task가 있으면 편집 모드
	$effect(() => {
		if (task) {
			formData = {
				name: task.name,
				description: task.description || '',
				assignee: task.assignee,
				status: task.status,
				priority: task.priority,
				startDate: task.startDate,
				endDate: task.endDate,
				progress: task.progress
			};
		} else {
			// 새 작업 모드 - 초기화
			formData = {
				name: '',
				description: '',
				assignee: '',
				status: 'planned',
				priority: 'medium',
				startDate: '',
				endDate: '',
				progress: 0
			};
		}
	});

	function handleSubmit() {
		if (!formData.name || !formData.assignee || !formData.startDate || !formData.endDate) {
			alert('필수 항목을 모두 입력해주세요.');
			return;
		}

		if (task) {
			// 편집 모드
			updateTask(task.id, formData);
		} else {
			// 새 작업 생성
			addTask(projectId, {
				...formData,
				projectId,
				color: getRandomColor()
			});
		}

		onClose();
	}

	function getRandomColor(): string {
		const colors = [
			'bg-blue-500',
			'bg-green-500',
			'bg-purple-500',
			'bg-orange-500',
			'bg-red-500',
			'bg-pink-500',
			'bg-indigo-500',
			'bg-teal-500'
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}
</script>

<Dialog {open} {onClose}>
	<div class="space-y-6">
		<div>
			<h2 class="text-lg font-semibold">{task ? '작업 편집' : '새 작업 추가'}</h2>
			<p class="text-sm text-muted-foreground">작업 정보를 입력하세요</p>
		</div>

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="name">작업명 *</Label>
					<Input
						id="name"
						bind:value={formData.name}
						placeholder="작업명을 입력하세요"
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="assignee">담당자 *</Label>
					{#if teamMembers.length > 0}
						<select
							id="assignee"
							bind:value={formData.assignee}
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							required
						>
							<option value="">담당자를 선택하세요</option>
							{#each teamMembers as member}
								<option value={member.name}>{member.name} ({member.role})</option>
							{/each}
						</select>
					{:else}
						<Input
							id="assignee"
							bind:value={formData.assignee}
							placeholder="담당자명을 입력하세요"
							required
						/>
						<p class="text-xs text-muted-foreground">팀원을 추가하면 드롭다운에서 선택할 수 있습니다</p>
					{/if}
				</div>
			</div>

			<div class="space-y-2">
				<Label for="description">설명</Label>
				<Input
					id="description"
					bind:value={formData.description}
					placeholder="작업 설명을 입력하세요"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="status">상태</Label>
					<select
						id="status"
						bind:value={formData.status}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<option value="planned">계획됨</option>
						<option value="in-progress">진행중</option>
						<option value="completed">완료</option>
						<option value="on-hold">보류</option>
					</select>
				</div>
				<div class="space-y-2">
					<Label for="priority">우선순위</Label>
					<select
						id="priority"
						bind:value={formData.priority}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<option value="low">낮음</option>
						<option value="medium">보통</option>
						<option value="high">높음</option>
					</select>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="startDate">시작일 *</Label>
					<Input
						id="startDate"
						type="date"
						bind:value={formData.startDate}
						required
					/>
				</div>
				<div class="space-y-2">
					<Label for="endDate">종료일 *</Label>
					<Input
						id="endDate"
						type="date"
						bind:value={formData.endDate}
						required
					/>
				</div>
			</div>

			<div class="space-y-2">
				<Label for="progress">진행률 ({formData.progress}%)</Label>
				<input
					id="progress"
					type="range"
					min="0"
					max="100"
					bind:value={formData.progress}
					class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
				/>
			</div>

			<div class="flex gap-2 pt-4">
				<Button type="submit" class="flex-1">
					{task ? '수정' : '추가'}
				</Button>
				<Button type="button" variant="outline" onclick={onClose}>
					취소
				</Button>
			</div>
		</form>
	</div>
</Dialog>
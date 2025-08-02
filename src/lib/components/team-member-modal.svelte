<script lang="ts">
	import Dialog from './ui/dialog.svelte';
	import Button from './ui/button.svelte';
	import Input from './ui/input.svelte';
	import Label from './ui/label.svelte';
	import { addMember, updateMember, type TeamMember } from '$lib/stores/tasks';
	import { globalTeamMembers } from '$lib/stores/globalTeamMembers';
	import { type GlobalTeamMember } from '$lib/models/GlobalTeamMember';

	type Props = {
		open: boolean;
		projectId: string;
		member?: TeamMember | null;
		onClose: () => void;
	};

	let { open, projectId, member = null, onClose }: Props = $props();

	let formData = $state({
		name: '',
		email: '',
		role: '',
		department: '',
		joinDate: '',
		globalMemberId: '' // 전역 팀원 선택
	});

	let isAssignMode = $state(true); // true: 기존 팀원 할당, false: 새 팀원 생성
	let selectedGlobalMember = $state<GlobalTeamMember | null>(null);

	// 활성 상태의 전역 팀원들만 가져오기
	const availableMembers = $derived(
		globalTeamMembers.getActiveMembers().filter(gMember => {
			// 이미 이 프로젝트에 할당된 팀원은 제외
			// TODO: 프로젝트의 기존 팀원 목록과 비교해서 필터링
			return true;
		})
	);

	// member가 있으면 편집 모드
	$effect(() => {
		if (member) {
			// 편집 모드
			isAssignMode = false;
			formData = {
				name: member.name,
				email: member.email,
				role: member.role,
				department: member.department || '',
				joinDate: member.joinDate,
				globalMemberId: ''
			};
		} else {
			// 새 팀원 모드 - 초기화
			isAssignMode = true;
			selectedGlobalMember = null;
			formData = {
				name: '',
				email: '',
				role: '',
				department: '',
				joinDate: new Date().toISOString().split('T')[0],
				globalMemberId: ''
			};
		}
	});

	// 전역 팀원 선택 시 정보 자동 입력
	$effect(() => {
		if (isAssignMode && formData.globalMemberId) {
			const gMember = $globalTeamMembers.find(m => m.id === formData.globalMemberId);
			if (gMember) {
				selectedGlobalMember = gMember;
				formData.name = gMember.name;
				formData.email = gMember.email;
				formData.department = gMember.department;
				formData.joinDate = gMember.joinDate;
				// role은 프로젝트별로 다를 수 있으므로 초기화
				formData.role = '';
			}
		} else if (isAssignMode && !formData.globalMemberId) {
			selectedGlobalMember = null;
			formData.name = '';
			formData.email = '';
			formData.department = '';
			formData.joinDate = '';
			formData.role = '';
		}
	});

	function handleSubmit() {
		if (isAssignMode && !formData.globalMemberId) {
			alert('할당할 팀원을 선택해주세요.');
			return;
		}

		if (!formData.name || !formData.email || !formData.role || !formData.joinDate) {
			alert('필수 항목을 모두 입력해주세요.');
			return;
		}

		// 이메일 형식 검증
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			alert('올바른 이메일 형식을 입력해주세요.');
			return;
		}

		if (member) {
			// 편집 모드
			updateMember(member.id, formData);
		} else {
			// 새 팀원 생성 또는 할당
			const memberData = {
				name: formData.name,
				email: formData.email,
				role: formData.role,
				department: formData.department,
				joinDate: formData.joinDate,
				globalMemberId: isAssignMode ? formData.globalMemberId : undefined
			};
			addMember(projectId, memberData);
		}

		onClose();
	}

	function toggleMode() {
		isAssignMode = !isAssignMode;
		// 모드 변경 시 폼 초기화
		formData = {
			name: '',
			email: '',
			role: '',
			department: '',
			joinDate: new Date().toISOString().split('T')[0],
			globalMemberId: ''
		};
		selectedGlobalMember = null;
	}

	const roleOptions = [
		'프론트엔드 개발자',
		'백엔드 개발자',
		'풀스택 개발자',
		'UI/UX 디자이너',
		'프로덕트 매니저',
		'프로젝트 매니저',
		'QA 엔지니어',
		'데브옵스 엔지니어',
		'시니어 개발자',
		'테크 리드',
		'기타'
	];

	const departmentOptions = [
		'개발팀',
		'디자인팀',
		'기획팀',
		'품질보증팀',
		'마케팅팀',
		'운영팀',
		'기타'
	];
</script>

<Dialog {open} {onClose}>
	<div class="space-y-6">
		<div>
			<h2 class="text-lg font-semibold">{member ? '팀원 정보 편집' : '팀원 할당'}</h2>
			<p class="text-sm text-muted-foreground">
				{member ? '팀원 정보를 수정하세요' : '프로젝트에 팀원을 할당하세요'}
			</p>
		</div>

		{#if !member}
			<!-- 모드 선택 탭 -->
			<div class="flex border-b">
				<button
					type="button"
					onclick={() => { isAssignMode = true; }}
					class="flex-1 py-2 px-4 text-sm font-medium {isAssignMode ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}"
				>
					기존 팀원 할당
				</button>
				<button
					type="button"
					onclick={() => { isAssignMode = false; }}
					class="flex-1 py-2 px-4 text-sm font-medium {!isAssignMode ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}"
				>
					새 팀원 생성
				</button>
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			{#if !member && isAssignMode}
				<!-- 기존 팀원 선택 -->
				<div class="space-y-2">
					<Label for="globalMember">팀원 선택 *</Label>
					<select
						id="globalMember"
						bind:value={formData.globalMemberId}
						class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						required
					>
						<option value="">팀원을 선택하세요</option>
						{#each availableMembers as gMember}
							<option value={gMember.id}>
								{gMember.name} ({gMember.position}) - {gMember.department}
							</option>
						{/each}
					</select>
					{#if availableMembers.length === 0}
						<p class="text-xs text-muted-foreground">
							할당 가능한 팀원이 없습니다. 먼저 팀원 관리에서 팀원을 등록해주세요.
						</p>
					{/if}
				</div>

				{#if selectedGlobalMember}
					<!-- 선택된 팀원 정보 미리보기 -->
					<div class="p-3 bg-muted rounded-md">
						<h4 class="text-sm font-medium mb-2">선택된 팀원 정보</h4>
						<div class="text-xs space-y-1 text-muted-foreground">
							<p>이름: {selectedGlobalMember.name}</p>
							<p>이메일: {selectedGlobalMember.email}</p>
							<p>직급: {selectedGlobalMember.position}</p>
							<p>직책: {selectedGlobalMember.jobTitle}</p>
							<p>부서: {selectedGlobalMember.department}</p>
						</div>
					</div>
				{/if}
			{/if}
			{#if !member && isAssignMode && !selectedGlobalMember}
				<!-- 팀원을 선택하지 않았을 때는 나머지 필드 숨김 -->
			{:else}
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="name">이름 *</Label>
						<Input
							id="name"
							bind:value={formData.name}
							placeholder="팀원 이름을 입력하세요"
							disabled={isAssignMode && selectedGlobalMember}
							required
						/>
					</div>
					<div class="space-y-2">
						<Label for="email">이메일 *</Label>
						<Input
							id="email"
							type="email"
							bind:value={formData.email}
							placeholder="email@company.com"
							disabled={isAssignMode && selectedGlobalMember}
							required
						/>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="role">프로젝트 역할 *</Label>
						<select
							id="role"
							bind:value={formData.role}
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							required
						>
							<option value="">프로젝트 역할을 선택하세요</option>
							{#each roleOptions as roleOption}
								<option value={roleOption}>{roleOption}</option>
							{/each}
						</select>
					</div>
					<div class="space-y-2">
						<Label for="department">부서</Label>
						<select
							id="department"
							bind:value={formData.department}
							disabled={isAssignMode && selectedGlobalMember}
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						>
							<option value="">부서를 선택하세요</option>
							{#each departmentOptions as deptOption}
								<option value={deptOption}>{deptOption}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="joinDate">입사일 *</Label>
					<Input
						id="joinDate"
						type="date"
						bind:value={formData.joinDate}
						disabled={isAssignMode && selectedGlobalMember}
						required
					/>
				</div>
			{/if}

			<div class="flex gap-2 pt-4">
				<Button type="submit" class="flex-1">
					{member ? '수정' : (isAssignMode ? '할당' : '추가')}
				</Button>
				<Button type="button" variant="outline" onclick={onClose}>
					취소
				</Button>
			</div>
		</form>
	</div>
</Dialog>
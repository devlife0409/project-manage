<script lang="ts">
	import { globalTeamMembers } from '$lib/stores/globalTeamMembers';
	import { type GlobalTeamMember } from '$lib/models/GlobalTeamMember';
	import Button from '$lib/components/ui/button.svelte';
	import Card from '$lib/components/ui/card.svelte';
	import { Plus, Edit, Trash2, Mail, User, Calendar, Phone, Building } from 'lucide-svelte';
	import GlobalMemberModal from '$lib/components/global-member-modal.svelte';
	import { formatDate } from '$lib/utils/date';

	let showMemberForm = $state(false);
	let editingMember = $state<GlobalTeamMember | null>(null);
	let searchTerm = $state('');
	let filterDepartment = $state('');
	let filterStatus = $state('');

	// 필터링된 팀원 목록
	const filteredMembers = $derived(() => {
		return $globalTeamMembers.filter(member => {
			const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
								member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
								member.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
			
			const matchesDepartment = !filterDepartment || member.department === filterDepartment;
			const matchesStatus = !filterStatus || member.status === filterStatus;

			return matchesSearch && matchesDepartment && matchesStatus;
		});
	});

	// 부서 목록
	const departments = $derived(() => {
		const depts = new Set($globalTeamMembers.map(m => m.department));
		return Array.from(depts).sort();
	});

	// 통계
	const stats = $derived(() => {
		const total = $globalTeamMembers.length;
		const active = $globalTeamMembers.filter(m => m.status === 'active').length;
		const inactive = $globalTeamMembers.filter(m => m.status === 'inactive').length;
		const onLeave = $globalTeamMembers.filter(m => m.status === 'on_leave').length;

		return { total, active, inactive, onLeave };
	});

	function openAddMember() {
		editingMember = null;
		showMemberForm = true;
	}

	function openEditMember(member: GlobalTeamMember) {
		editingMember = member;
		showMemberForm = true;
	}

	function handleDeleteMember(member: GlobalTeamMember) {
		if (confirm(`"${member.name}" 팀원을 삭제하시겠습니까?`)) {
			globalTeamMembers.deleteMember(member.id);
		}
	}

	function closeMemberForm() {
		showMemberForm = false;
		editingMember = null;
	}

	function clearFilters() {
		searchTerm = '';
		filterDepartment = '';
		filterStatus = '';
	}

	// 개발용 샘플 데이터 추가
	function addSampleData() {
		globalTeamMembers.addSampleData();
	}
</script>

<svelte:head>
	<title>팀원 관리 - Project Manager</title>
</svelte:head>

<div class="p-6 space-y-6">
	<!-- 헤더 -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">팀원 관리</h1>
			<p class="text-muted-foreground">전사 팀원을 등록하고 관리하세요</p>
		</div>
		<div class="flex gap-2">
			{#if $globalTeamMembers.length === 0}
				<Button onclick={addSampleData} variant="outline" class="gap-2">
					<User class="h-4 w-4" />
					샘플 데이터 추가
				</Button>
			{/if}
			<Button onclick={openAddMember} class="gap-2">
				<Plus class="h-4 w-4" />
				팀원 등록
			</Button>
		</div>
	</div>

	<!-- 통계 -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
					<User class="h-5 w-5 text-blue-600 dark:text-blue-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">전체</p>
					<p class="text-2xl font-bold">{stats.total}명</p>
				</div>
			</div>
		</Card>
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
					<User class="h-5 w-5 text-green-600 dark:text-green-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">재직중</p>
					<p class="text-2xl font-bold">{stats.active}명</p>
				</div>
			</div>
		</Card>
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
					<User class="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">휴직중</p>
					<p class="text-2xl font-bold">{stats.onLeave}명</p>
				</div>
			</div>
		</Card>
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
					<User class="h-5 w-5 text-gray-600 dark:text-gray-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">퇴사</p>
					<p class="text-2xl font-bold">{stats.inactive}명</p>
				</div>
			</div>
		</Card>
	</div>

	<!-- 필터 -->
	<Card class="p-4">
		<div class="flex flex-col md:flex-row gap-4">
			<div class="flex-1">
				<input
					type="text"
					placeholder="이름, 이메일, 직책으로 검색..."
					bind:value={searchTerm}
					class="w-full px-3 py-2 border border-input rounded-md bg-background"
				/>
			</div>
			<select
				bind:value={filterDepartment}
				class="px-3 py-2 border border-input rounded-md bg-background"
			>
				<option value="">전체 부서</option>
				{#each departments as dept}
					<option value={dept}>{dept}</option>
				{/each}
			</select>
			<select
				bind:value={filterStatus}
				class="px-3 py-2 border border-input rounded-md bg-background"
			>
				<option value="">전체 상태</option>
				<option value="active">재직중</option>
				<option value="on_leave">휴직중</option>
				<option value="inactive">퇴사</option>
			</select>
			<Button onclick={clearFilters} variant="outline">
				필터 초기화
			</Button>
		</div>
	</Card>

	<!-- 팀원 목록 -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each filteredMembers as member}
			<Card class="p-4 hover:shadow-md transition-shadow group">
				<div class="space-y-3">
					<!-- 멤버 헤더 -->
					<div class="flex items-start justify-between">
						<div class="flex items-center gap-3">
							<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
								{member.getInitials()}
							</div>
							<div>
								<h3 class="font-semibold">{member.name}</h3>
								<div class="flex gap-1 mt-1">
									<span class="text-xs px-2 py-1 rounded-full {member.getPositionBadgeColor()}">
										{member.position}
									</span>
									<span class="text-xs px-2 py-1 rounded-full {member.getStatusBadgeColor()}">
										{member.getStatusText()}
									</span>
								</div>
							</div>
						</div>
						<div class="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
							<button
								onclick={() => openEditMember(member)}
								class="p-1 hover:bg-accent rounded-sm"
								title="편집"
							>
								<Edit class="h-3 w-3" />
							</button>
							<button
								onclick={() => handleDeleteMember(member)}
								class="p-1 hover:bg-destructive hover:text-destructive-foreground rounded-sm"
								title="삭제"
							>
								<Trash2 class="h-3 w-3" />
							</button>
						</div>
					</div>

					<!-- 직책 -->
					<div>
						<span class="text-sm px-2 py-1 rounded-full {member.getJobTitleBadgeColor()}">
							{member.jobTitle}
						</span>
					</div>

					<!-- 멤버 정보 -->
					<div class="space-y-2 text-sm">
						<div class="flex items-center gap-2 text-muted-foreground">
							<Mail class="h-3 w-3" />
							<span class="truncate">{member.email}</span>
						</div>
						<div class="flex items-center gap-2 text-muted-foreground">
							<Building class="h-3 w-3" />
							<span>{member.department}</span>
						</div>
						{#if member.phone}
							<div class="flex items-center gap-2 text-muted-foreground">
								<Phone class="h-3 w-3" />
								<span>{member.phone}</span>
							</div>
						{/if}
						<div class="flex items-center gap-2 text-muted-foreground">
							<Calendar class="h-3 w-3" />
							<span>입사일: {formatDate(member.joinDate)}</span>
						</div>
						<div class="text-xs text-muted-foreground">
							근무기간: {member.getWorkingPeriodText()}
						</div>
					</div>
				</div>
			</Card>
		{/each}

		{#if filteredMembers.length === 0}
			<div class="col-span-full">
				<Card class="p-8">
					<div class="text-center space-y-4">
						<User class="h-16 w-16 mx-auto text-muted-foreground" />
						<div>
							{#if $globalTeamMembers.length === 0}
								<h3 class="text-lg font-semibold">등록된 팀원이 없습니다</h3>
								<p class="text-muted-foreground">첫 번째 팀원을 등록해보세요</p>
							{:else}
								<h3 class="text-lg font-semibold">검색 결과가 없습니다</h3>
								<p class="text-muted-foreground">다른 검색어를 시도해보세요</p>
							{/if}
						</div>
						{#if $globalTeamMembers.length === 0}
							<Button onclick={openAddMember} class="gap-2">
								<Plus class="h-4 w-4" />
								팀원 등록
							</Button>
						{/if}
					</div>
				</Card>
			</div>
		{/if}
	</div>

	<!-- 팀원 폼 모달 -->
	<GlobalMemberModal
		open={showMemberForm}
		member={editingMember}
		onClose={closeMemberForm}
	/>
</div>
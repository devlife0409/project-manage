<script lang="ts">
	import { projects, deleteMember, type TeamMember } from '$lib/stores/tasks';
	import Button from './ui/button.svelte';
	import Card from './ui/card.svelte';
	import { Plus, Edit, Trash2, Mail, User, Calendar } from 'lucide-svelte';
	import TeamMemberModal from './team-member-modal.svelte';
	import { getRoleBadgeColor, getInitials } from '$lib/utils/ui';
	import { formatDate } from '$lib/utils/date';
	import { calculateTeamStats } from '$lib/services/team';

	type Props = {
		projectId: string;
	};

	let { projectId }: Props = $props();

	let showMemberForm = $state(false);
	let editingMember = $state<TeamMember | null>(null);

	const currentProject = $derived(() => {
		return $projects.find(p => p.id === projectId);
	});

	const members = $derived(currentProject?.members || []);
	const teamStats = $derived(calculateTeamStats(members));

	function openAddMember() {
		editingMember = null;
		showMemberForm = true;
	}

	function openEditMember(member: TeamMember) {
		editingMember = member;
		showMemberForm = true;
	}

	function handleDeleteMember(member: TeamMember) {
		if (confirm(`"${member.name}" 팀원을 삭제하시겠습니까?`)) {
			deleteMember(member.id);
		}
	}

	function closeMemberForm() {
		showMemberForm = false;
		editingMember = null;
	}

</script>

<div class="space-y-6">
	<!-- 헤더 -->
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">팀원 관리</h2>
			<p class="text-muted-foreground">프로젝트 팀원을 관리하세요</p>
		</div>
		<Button onclick={openAddMember} class="gap-2">
			<Plus class="h-4 w-4" />
			팀원 추가
		</Button>
	</div>

	<!-- 팀원 통계 -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
					<User class="h-5 w-5 text-blue-600 dark:text-blue-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">총 팀원</p>
					<p class="text-2xl font-bold">{teamStats.totalMembers}명</p>
				</div>
			</div>
		</Card>
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
					<User class="h-5 w-5 text-green-600 dark:text-green-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">개발팀</p>
					<p class="text-2xl font-bold">{teamStats.developerCount}명</p>
				</div>
			</div>
		</Card>
		<Card class="p-4">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
					<User class="h-5 w-5 text-purple-600 dark:text-purple-400" />
				</div>
				<div>
					<p class="text-sm text-muted-foreground">기타팀</p>
					<p class="text-2xl font-bold">{teamStats.otherCount}명</p>
				</div>
			</div>
		</Card>
	</div>

	<!-- 팀원 목록 -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each members as member}
			<Card class="p-4 hover:shadow-md transition-shadow group">
				<div class="space-y-3">
					<!-- 멤버 헤더 -->
					<div class="flex items-start justify-between">
						<div class="flex items-center gap-3">
							<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
								{getInitials(member.name)}
							</div>
							<div>
								<h3 class="font-semibold">{member.name}</h3>
								<span class="text-xs px-2 py-1 rounded-full {getRoleBadgeColor(member.role)}">
									{member.role}
								</span>
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

					<!-- 멤버 정보 -->
					<div class="space-y-2 text-sm">
						<div class="flex items-center gap-2 text-muted-foreground">
							<Mail class="h-3 w-3" />
							<span>{member.email}</span>
						</div>
						{#if member.department}
							<div class="flex items-center gap-2 text-muted-foreground">
								<User class="h-3 w-3" />
								<span>{member.department}</span>
							</div>
						{/if}
						<div class="flex items-center gap-2 text-muted-foreground">
							<Calendar class="h-3 w-3" />
							<span>입사일: {formatDate(member.joinDate)}</span>
						</div>
					</div>
				</div>
			</Card>
		{/each}

		{#if members.length === 0}
			<div class="col-span-full">
				<Card class="p-8">
					<div class="text-center space-y-4">
						<User class="h-16 w-16 mx-auto text-muted-foreground" />
						<div>
							<h3 class="text-lg font-semibold">팀원이 없습니다</h3>
							<p class="text-muted-foreground">첫 번째 팀원을 추가해보세요</p>
						</div>
						<Button onclick={openAddMember} class="gap-2">
							<Plus class="h-4 w-4" />
							팀원 추가
						</Button>
					</div>
				</Card>
			</div>
		{/if}
	</div>

	<!-- 팀원 폼 모달 -->
	<TeamMemberModal
		open={showMemberForm}
		{projectId}
		member={editingMember}
		onClose={closeMemberForm}
	/>
</div>
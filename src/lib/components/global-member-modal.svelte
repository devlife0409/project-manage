<script lang="ts">
	import { globalTeamMembers } from '$lib/stores/globalTeamMembers';
	import { type GlobalTeamMember, type GlobalTeamMemberData } from '$lib/models/GlobalTeamMember';
	import Dialog from './ui/dialog.svelte';
	import Button from './ui/button.svelte';
	import Input from './ui/input.svelte';
	import Label from './ui/label.svelte';
	import { X } from 'lucide-svelte';

	type Props = {
		open: boolean;
		member?: GlobalTeamMember | null;
		onClose: () => void;
	};

	let { open, member, onClose }: Props = $props();

	let formData = $state({
		name: '',
		email: '',
		position: '',
		jobTitle: '',
		department: '',
		phone: '',
		joinDate: '',
		status: 'active' as 'active' | 'inactive' | 'on_leave'
	});

	let errors = $state<string[]>([]);
	let isSubmitting = $state(false);

	// 기본 옵션들
	const positions = ['사원', '주임', '대리', '과장', '차장', '부장', '이사', '전무', '상무'];
	const departments = ['개발팀', '디자인팀', '기획팀', 'QA팀', '마케팅팀', '영업팀', '인사팀', '재무팀'];
	const jobTitles = [
		'프론트엔드 개발자', '백엔드 개발자', '풀스택 개발자', 'DevOps 엔지니어',
		'UI/UX 디자이너', '그래픽 디자이너', '제품 디자이너',
		'프로젝트 매니저', '제품 매니저', '기획자',
		'QA 엔지니어', '테스트 엔지니어',
		'마케팅 전문가', '영업 담당자', '인사 담당자', '회계 담당자'
	];

	// 멤버 정보가 변경될 때 폼 데이터 업데이트
	$effect(() => {
		if (member) {
			formData = {
				name: member.name,
				email: member.email,
				position: member.position,
				jobTitle: member.jobTitle,
				department: member.department,
				phone: member.phone || '',
				joinDate: member.joinDate,
				status: member.status
			};
		} else {
			formData = {
				name: '',
				email: '',
				position: '',
				jobTitle: '',
				department: '',
				phone: '',
				joinDate: new Date().toISOString().split('T')[0],
				status: 'active'
			};
		}
		errors = [];
	});

	function validateForm(): boolean {
		errors = [];

		if (!formData.name.trim()) {
			errors.push('이름을 입력해주세요.');
		}

		if (!formData.email.trim()) {
			errors.push('이메일을 입력해주세요.');
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formData.email)) {
				errors.push('올바른 이메일 형식을 입력해주세요.');
			} else {
				// 중복 이메일 체크 (수정 시 자기 자신 제외)
				const existingMember = globalTeamMembers.getMemberByEmail(formData.email);
				if (existingMember && existingMember.id !== member?.id) {
					errors.push('이미 등록된 이메일입니다.');
				}
			}
		}

		if (!formData.position.trim()) {
			errors.push('직급을 선택해주세요.');
		}

		if (!formData.jobTitle.trim()) {
			errors.push('직책을 선택해주세요.');
		}

		if (!formData.department.trim()) {
			errors.push('부서를 선택해주세요.');
		}

		if (!formData.joinDate) {
			errors.push('입사일을 입력해주세요.');
		}

		return errors.length === 0;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (!validateForm()) return;

		isSubmitting = true;

		try {
			const memberData: GlobalTeamMemberData = {
				name: formData.name.trim(),
				email: formData.email.trim(),
				position: formData.position,
				jobTitle: formData.jobTitle,
				department: formData.department,
				phone: formData.phone.trim() || undefined,
				joinDate: formData.joinDate,
				status: formData.status
			};

			if (member) {
				// 수정
				globalTeamMembers.updateMember(member.id, memberData);
			} else {
				// 추가
				globalTeamMembers.addMember(memberData);
			}

			onClose();
		} catch (error) {
			console.error('팀원 저장 실패:', error);
			errors = ['팀원 정보 저장에 실패했습니다.'];
		} finally {
			isSubmitting = false;
		}
	}

	function handleCancel() {
		onClose();
	}
</script>

<Dialog {open} onClose={onClose} class="max-w-md">
	<div class="flex items-center justify-between p-6 border-b">
		<h2 class="text-lg font-semibold">
			{member ? '팀원 정보 수정' : '새 팀원 등록'}
		</h2>
		<button onclick={onClose} class="p-1 hover:bg-accent rounded-sm">
			<X class="h-4 w-4" />
		</button>
	</div>

	<form onsubmit={handleSubmit} class="p-6 space-y-4">
		{#if errors.length > 0}
			<div class="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
				<ul class="text-sm text-destructive space-y-1">
					{#each errors as error}
						<li>• {error}</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label for="name">이름 *</Label>
				<Input
					id="name"
					bind:value={formData.name}
					placeholder="홍길동"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="email">이메일 *</Label>
				<Input
					id="email"
					type="email"
					bind:value={formData.email}
					placeholder="hong@company.com"
					required
				/>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label for="position">직급 *</Label>
				<select
					id="position"
					bind:value={formData.position}
					class="w-full px-3 py-2 border border-input rounded-md bg-background"
					required
				>
					<option value="">선택하세요</option>
					{#each positions as pos}
						<option value={pos}>{pos}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-2">
				<Label for="department">부서 *</Label>
				<select
					id="department"
					bind:value={formData.department}
					class="w-full px-3 py-2 border border-input rounded-md bg-background"
					required
				>
					<option value="">선택하세요</option>
					{#each departments as dept}
						<option value={dept}>{dept}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="space-y-2">
			<Label for="jobTitle">직책 *</Label>
			<select
				id="jobTitle"
				bind:value={formData.jobTitle}
				class="w-full px-3 py-2 border border-input rounded-md bg-background"
				required
			>
				<option value="">선택하세요</option>
				{#each jobTitles as title}
					<option value={title}>{title}</option>
				{/each}
			</select>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label for="phone">연락처</Label>
				<Input
					id="phone"
					bind:value={formData.phone}
					placeholder="010-1234-5678"
				/>
			</div>

			<div class="space-y-2">
				<Label for="joinDate">입사일 *</Label>
				<Input
					id="joinDate"
					type="date"
					bind:value={formData.joinDate}
					required
				/>
			</div>
		</div>

		<div class="space-y-2">
			<Label for="status">재직상태 *</Label>
			<select
				id="status"
				bind:value={formData.status}
				class="w-full px-3 py-2 border border-input rounded-md bg-background"
				required
			>
				<option value="active">재직중</option>
				<option value="on_leave">휴직중</option>
				<option value="inactive">퇴사</option>
			</select>
		</div>

		<div class="flex gap-2 pt-4">
			<Button type="submit" disabled={isSubmitting} class="flex-1">
				{isSubmitting ? '저장중...' : (member ? '수정' : '등록')}
			</Button>
			<Button type="button" variant="outline" onclick={handleCancel}>
				취소
			</Button>
		</div>
	</form>
</Dialog>
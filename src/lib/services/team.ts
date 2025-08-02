/**
 * 팀 관련 비즈니스 로직
 */
import type { TeamMember } from '$lib/stores/tasks';

export interface TeamStats {
	totalMembers: number;
	developerCount: number;
	otherCount: number;
	departmentCounts: Record<string, number>;
}

export function calculateTeamStats(members: TeamMember[]): TeamStats {
	const developerCount = members.filter(m => m.department === '개발팀').length;
	const otherCount = members.filter(m => m.department !== '개발팀').length;
	
	const departmentCounts = members.reduce((acc, member) => {
		const dept = member.department || '기타';
		acc[dept] = (acc[dept] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	return {
		totalMembers: members.length,
		developerCount,
		otherCount,
		departmentCounts
	};
}

export function validateMemberData(memberData: Partial<TeamMember>): string[] {
	const errors: string[] = [];

	if (!memberData.name?.trim()) {
		errors.push('이름은 필수 항목입니다.');
	}

	if (!memberData.email?.trim()) {
		errors.push('이메일은 필수 항목입니다.');
	} else {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(memberData.email)) {
			errors.push('올바른 이메일 형식을 입력해주세요.');
		}
	}

	if (!memberData.role?.trim()) {
		errors.push('역할은 필수 항목입니다.');
	}

	if (!memberData.joinDate) {
		errors.push('입사일은 필수 항목입니다.');
	}

	return errors;
}
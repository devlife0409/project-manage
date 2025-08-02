import { writable } from 'svelte/store';
import { GlobalTeamMember, type GlobalTeamMemberData } from '$lib/models/GlobalTeamMember';
import { browser } from '$app/environment';

const STORAGE_KEY = 'global-team-members';

function createGlobalTeamMembersStore() {
	const initialMembers: GlobalTeamMember[] = [];
	
	// 로컬 스토리지에서 데이터 로드
	if (browser) {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const memberData = JSON.parse(stored);
				initialMembers.push(...memberData.map((data: GlobalTeamMemberData) => new GlobalTeamMember(data)));
			}
		} catch (error) {
			console.error('전역 팀원 데이터 로드 실패:', error);
		}
	}

	const { subscribe, set, update } = writable<GlobalTeamMember[]>(initialMembers);

	// 로컬 스토리지에 저장
	function saveToStorage(members: GlobalTeamMember[]) {
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(members.map(member => member.toJSON())));
			} catch (error) {
				console.error('전역 팀원 데이터 저장 실패:', error);
			}
		}
	}

	return {
		subscribe,
		
		// 팀원 추가
		addMember: (memberData: GlobalTeamMemberData) => {
			const newMember = new GlobalTeamMember(memberData);
			update(members => {
				const updated = [...members, newMember];
				saveToStorage(updated);
				return updated;
			});
			return newMember;
		},

		// 팀원 수정
		updateMember: (id: string, updates: Partial<GlobalTeamMemberData>) => {
			update(members => {
				const updated = members.map(member => 
					member.id === id ? member.update(updates) : member
				);
				saveToStorage(updated);
				return updated;
			});
		},

		// 팀원 삭제
		deleteMember: (id: string) => {
			update(members => {
				const updated = members.filter(member => member.id !== id);
				saveToStorage(updated);
				return updated;
			});
		},

		// ID로 팀원 찾기
		getMemberById: (id: string): GlobalTeamMember | undefined => {
			let foundMember: GlobalTeamMember | undefined;
			update(members => {
				foundMember = members.find(member => member.id === id);
				return members;
			});
			return foundMember;
		},

		// 이메일로 팀원 찾기
		getMemberByEmail: (email: string): GlobalTeamMember | undefined => {
			let foundMember: GlobalTeamMember | undefined;
			update(members => {
				foundMember = members.find(member => member.email === email);
				return members;
			});
			return foundMember;
		},

		// 활성 팀원만 필터링
		getActiveMembers: (): GlobalTeamMember[] => {
			let activeMembers: GlobalTeamMember[] = [];
			update(members => {
				activeMembers = members.filter(member => member.status === 'active');
				return members;
			});
			return activeMembers;
		},

		// 부서별 팀원 필터링
		getMembersByDepartment: (department: string): GlobalTeamMember[] => {
			let departmentMembers: GlobalTeamMember[] = [];
			update(members => {
				departmentMembers = members.filter(member => member.department === department);
				return members;
			});
			return departmentMembers;
		},

		// 전체 초기화 (개발용)
		reset: () => {
			set([]);
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
		},

		// 샘플 데이터 추가 (개발용)
		addSampleData: () => {
			const sampleMembers: GlobalTeamMemberData[] = [
				{
					name: '김개발',
					email: 'kim.dev@company.com',
					position: '대리',
					jobTitle: '프론트엔드 개발자',
					department: '개발팀',
					joinDate: '2022-03-15',
					phone: '010-1234-5678',
					status: 'active'
				},
				{
					name: '이디자인',
					email: 'lee.design@company.com',
					position: '사원',
					jobTitle: 'UI/UX 디자이너',
					department: '디자인팀',
					joinDate: '2023-01-10',
					phone: '010-2345-6789',
					status: 'active'
				},
				{
					name: '박매니저',
					email: 'park.pm@company.com',
					position: '과장',
					jobTitle: '프로젝트 매니저',
					department: '기획팀',
					joinDate: '2021-06-01',
					phone: '010-3456-7890',
					status: 'active'
				},
				{
					name: '최백엔드',
					email: 'choi.backend@company.com',
					position: '주임',
					jobTitle: '백엔드 개발자',
					department: '개발팀',
					joinDate: '2022-09-20',
					phone: '010-4567-8901',
					status: 'active'
				},
				{
					name: '정QA',
					email: 'jung.qa@company.com',
					position: '사원',
					jobTitle: 'QA 엔지니어',
					department: 'QA팀',
					joinDate: '2023-05-15',
					phone: '010-5678-9012',
					status: 'active'
				}
			];

			update(members => {
				const newMembers = sampleMembers.map(data => new GlobalTeamMember(data));
				const updated = [...members, ...newMembers];
				saveToStorage(updated);
				return updated;
			});
		}
	};
}

export const globalTeamMembers = createGlobalTeamMembersStore();
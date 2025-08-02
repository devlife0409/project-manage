import { ProjectManager } from '../managers/ProjectManager';
import type { ProjectData } from '../models/Project';

// 초기 데이터
const initialProjects: ProjectData[] = [
	{
		id: '1',
		name: '웹사이트 리뉴얼',
		description: '회사 웹사이트를 새로운 디자인으로 리뉴얼',
		status: '진행중',
		members: [
			{
				id: 'm1',
				name: '김개발',
				email: 'dev.kim@company.com',
				role: '프론트엔드 개발자',
				department: '개발팀',
				joinDate: '2024-01-15'
			},
			{
				id: 'm2',
				name: '박디자인',
				email: 'design.park@company.com',
				role: 'UI/UX 디자이너',
				department: '디자인팀',
				joinDate: '2024-02-01'
			},
			{
				id: 'm3',
				name: '이프론트',
				email: 'frontend.lee@company.com',
				role: '프론트엔드 개발자',
				department: '개발팀',
				joinDate: '2024-01-20'
			},
			{
				id: 'm4',
				name: '최백엔드',
				email: 'backend.choi@company.com',
				role: '백엔드 개발자',
				department: '개발팀',
				joinDate: '2024-01-10'
			},
			{
				id: 'm5',
				name: '테스터',
				email: 'test@company.com',
				role: 'QA 엔지니어',
				department: '품질보증팀',
				joinDate: '2024-03-01'
			}
		],
		tasks: [
			{
				id: '1-1',
				name: '요구사항 분석',
				description: '프로젝트 요구사항 정의 및 분석',
				assignee: '김개발',
				status: 'completed',
				priority: 'high',
				startDate: '2024-08-01',
				endDate: '2024-08-05',
				progress: 100,
				projectId: '1',
				color: 'bg-blue-500'
			},
			{
				id: '1-2',
				name: 'UI/UX 디자인',
				description: '사용자 인터페이스 및 경험 디자인',
				assignee: '박디자인',
				status: 'in-progress',
				priority: 'high',
				startDate: '2024-08-05',
				endDate: '2024-08-15',
				progress: 75,
				projectId: '1',
				dependencies: ['1-1'],
				color: 'bg-green-500'
			},
			{
				id: '1-3',
				name: '프론트엔드 개발',
				description: 'React 기반 프론트엔드 개발',
				assignee: '이프론트',
				status: 'in-progress',
				priority: 'medium',
				startDate: '2024-08-10',
				endDate: '2024-08-25',
				progress: 60,
				projectId: '1',
				dependencies: ['1-2'],
				color: 'bg-purple-500'
			},
			{
				id: '1-4',
				name: '백엔드 API 개발',
				description: 'RESTful API 서버 개발',
				assignee: '최백엔드',
				status: 'planned',
				priority: 'high',
				startDate: '2024-08-15',
				endDate: '2024-08-30',
				progress: 20,
				projectId: '1',
				dependencies: ['1-1'],
				color: 'bg-orange-500'
			},
			{
				id: '1-5',
				name: '통합 테스트',
				description: '전체 시스템 통합 테스트',
				assignee: '테스터',
				status: 'planned',
				priority: 'medium',
				startDate: '2024-08-25',
				endDate: '2024-09-05',
				progress: 0,
				projectId: '1',
				dependencies: ['1-3', '1-4'],
				color: 'bg-red-500'
			}
		]
	},
	{
		id: '2',
		name: '모바일 앱 개발',
		description: 'iOS/Android 앱 개발 프로젝트',
		status: '진행중',
		members: [
			{
				id: 'm6',
				name: '기획자',
				email: 'plan@company.com',
				role: '프로덕트 매니저',
				department: '기획팀',
				joinDate: '2024-02-15'
			},
			{
				id: 'm7',
				name: 'iOS개발자',
				email: 'ios@company.com',
				role: 'iOS 개발자',
				department: '개발팀',
				joinDate: '2024-03-01'
			}
		],
		tasks: [
			{
				id: '2-1',
				name: '앱 기획',
				assignee: '기획자',
				status: 'completed',
				priority: 'high',
				startDate: '2024-08-01',
				endDate: '2024-08-10',
				progress: 100,
				projectId: '2',
				color: 'bg-blue-500'
			},
			{
				id: '2-2',
				name: 'iOS 개발',
				assignee: 'iOS개발자',
				status: 'in-progress',
				priority: 'high',
				startDate: '2024-08-10',
				endDate: '2024-09-15',
				progress: 45,
				projectId: '2',
				dependencies: ['2-1'],
				color: 'bg-green-500'
			}
		]
	},
	{
		id: '3',
		name: 'API 서버 구축',
		description: 'RESTful API 서버 구축 및 배포',
		status: '완료',
		members: [
			{
				id: 'm8',
				name: '시니어개발자',
				email: 'senior@company.com',
				role: '시니어 개발자',
				department: '개발팀',
				joinDate: '2023-12-01'
			},
			{
				id: 'm9',
				name: '백엔드개발자',
				email: 'backend@company.com',
				role: '백엔드 개발자',
				department: '개발팀',
				joinDate: '2024-01-05'
			}
		],
		tasks: [
			{
				id: '3-1',
				name: '서버 아키텍처 설계',
				assignee: '시니어개발자',
				status: 'completed',
				priority: 'high',
				startDate: '2024-07-01',
				endDate: '2024-07-15',
				progress: 100,
				projectId: '3',
				color: 'bg-blue-500'
			},
			{
				id: '3-2',
				name: 'API 개발',
				assignee: '백엔드개발자',
				status: 'completed',
				priority: 'high',
				startDate: '2024-07-15',
				endDate: '2024-08-15',
				progress: 100,
				projectId: '3',
				dependencies: ['3-1'],
				color: 'bg-green-500'
			}
		]
	}
];

// 전역 ProjectManager 인스턴스 생성
export const projectManager = new ProjectManager(initialProjects);

// Svelte 스토어로 사용
export const projects = projectManager.store;

// 편의 함수들 - 기존 함수형 스타일과 호환성 유지
export const getProjectById = (id: string) => projectManager.getProjectById(id);
export const addTask = (projectId: string, taskData: any) => projectManager.addTask(projectId, taskData);
export const updateTask = (taskId: string, updates: any) => projectManager.updateTask(taskId, updates);
export const deleteTask = (taskId: string) => projectManager.deleteTask(taskId);
export const addMember = (projectId: string, memberData: any) => projectManager.addMember(projectId, memberData);
export const updateMember = (memberId: string, updates: any) => projectManager.updateMember(memberId, updates);
export const deleteMember = (memberId: string) => projectManager.deleteMember(memberId);

// 색상 유틸리티 함수들
export function getStatusColor(status: string): string {
	switch (status) {
		case 'completed':
			return 'bg-green-500';
		case 'in-progress':
			return 'bg-blue-500';
		case 'planned':
			return 'bg-gray-500';
		case 'on-hold':
			return 'bg-yellow-500';
		default:
			return 'bg-gray-500';
	}
}

export function getPriorityColor(priority: string): string {
	switch (priority) {
		case 'high':
			return 'text-red-500';
		case 'medium':
			return 'text-yellow-500';
		case 'low':
			return 'text-green-500';
		default:
			return 'text-gray-500';
	}
}
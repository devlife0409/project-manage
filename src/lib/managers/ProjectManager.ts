import { writable, type Writable } from 'svelte/store';
import { Project, type ProjectData } from '../models/Project';
import { Task, type TaskData } from '../models/Task';
import { TeamMember, type TeamMemberData } from '../models/TeamMember';

export class ProjectManager {
	private _projects: Project[] = [];
	private _store: Writable<Project[]>;

	constructor(initialData?: ProjectData[]) {
		if (initialData) {
			this._projects = initialData.map(data => new Project(data));
		}
		this._store = writable(this._projects);
	}

	// Svelte store 반환
	get store(): Writable<Project[]> {
		return this._store;
	}

	// 현재 프로젝트 목록 반환
	get projects(): Project[] {
		return [...this._projects];
	}

	// 스토어 업데이트
	private updateStore(): void {
		this._store.set([...this._projects]);
	}

	// === 프로젝트 CRUD ===

	createProject(projectData: Omit<ProjectData, 'id'>): Project {
		const project = new Project(projectData);
		this._projects.push(project);
		this.updateStore();
		return project;
	}

	getProjectById(projectId: string): Project | null {
		return this._projects.find(p => p.id === projectId) || null;
	}

	updateProject(projectId: string, updates: Partial<ProjectData>): Project | null {
		const project = this.getProjectById(projectId);
		if (project) {
			project.update(updates);
			this.updateStore();
			return project;
		}
		return null;
	}

	deleteProject(projectId: string): boolean {
		const index = this._projects.findIndex(p => p.id === projectId);
		if (index !== -1) {
			this._projects.splice(index, 1);
			this.updateStore();
			return true;
		}
		return false;
	}

	// === 작업 관리 ===

	addTask(projectId: string, taskData: Omit<TaskData, 'projectId' | 'id'>): Task | null {
		const project = this.getProjectById(projectId);
		if (project) {
			const task = project.addTask(taskData);
			this.updateStore();
			return task;
		}
		return null;
	}

	updateTask(taskId: string, updates: Partial<TaskData>): Task | null {
		for (const project of this._projects) {
			const task = project.updateTask(taskId, updates);
			if (task) {
				this.updateStore();
				return task;
			}
		}
		return null;
	}

	deleteTask(taskId: string): boolean {
		for (const project of this._projects) {
			if (project.deleteTask(taskId)) {
				this.updateStore();
				return true;
			}
		}
		return false;
	}

	getTaskById(taskId: string): { task: Task; project: Project } | null {
		for (const project of this._projects) {
			const task = project.getTaskById(taskId);
			if (task) {
				return { task, project };
			}
		}
		return null;
	}

	// === 팀원 관리 ===

	addMember(projectId: string, memberData: Omit<TeamMemberData, 'id'>): TeamMember | null {
		const project = this.getProjectById(projectId);
		if (project) {
			const member = project.addMember(memberData);
			this.updateStore();
			return member;
		}
		return null;
	}

	updateMember(memberId: string, updates: Partial<TeamMemberData>): TeamMember | null {
		for (const project of this._projects) {
			const member = project.updateMember(memberId, updates);
			if (member) {
				this.updateStore();
				return member;
			}
		}
		return null;
	}

	deleteMember(memberId: string): boolean {
		for (const project of this._projects) {
			if (project.deleteMember(memberId)) {
				this.updateStore();
				return true;
			}
		}
		return false;
	}

	getMemberById(memberId: string): { member: TeamMember; project: Project } | null {
		for (const project of this._projects) {
			const member = project.getMemberById(memberId);
			if (member) {
				return { member, project };
			}
		}
		return null;
	}

	// === 검색 및 필터링 ===

	searchProjects(query: string): Project[] {
		const lowercaseQuery = query.toLowerCase();
		return this._projects.filter(project => 
			project.name.toLowerCase().includes(lowercaseQuery) ||
			project.description.toLowerCase().includes(lowercaseQuery)
		);
	}

	getProjectsByStatus(status: Project['status']): Project[] {
		return this._projects.filter(p => p.status === status);
	}

	searchTasks(query: string): { task: Task; project: Project }[] {
		const results: { task: Task; project: Project }[] = [];
		const lowercaseQuery = query.toLowerCase();

		for (const project of this._projects) {
			const tasks = project.tasks.filter(task =>
				task.name.toLowerCase().includes(lowercaseQuery) ||
				task.description?.toLowerCase().includes(lowercaseQuery) ||
				task.assignee.toLowerCase().includes(lowercaseQuery)
			);
			
			tasks.forEach(task => {
				results.push({ task, project });
			});
		}

		return results;
	}

	searchMembers(query: string): { member: TeamMember; project: Project }[] {
		const results: { member: TeamMember; project: Project }[] = [];
		const lowercaseQuery = query.toLowerCase();

		for (const project of this._projects) {
			const members = project.members.filter(member =>
				member.name.toLowerCase().includes(lowercaseQuery) ||
				member.email.toLowerCase().includes(lowercaseQuery) ||
				member.role.toLowerCase().includes(lowercaseQuery)
			);
			
			members.forEach(member => {
				results.push({ member, project });
			});
		}

		return results;
	}

	// === 통계 및 분석 ===

	getOverallStats(): {
		totalProjects: number;
		activeProjects: number;
		completedProjects: number;
		totalTasks: number;
		completedTasks: number;
		totalMembers: number;
		averageProgress: number;
	} {
		const totalProjects = this._projects.length;
		const activeProjects = this.getProjectsByStatus('진행중').length;
		const completedProjects = this.getProjectsByStatus('완료').length;
		
		let totalTasks = 0;
		let completedTasks = 0;
		let totalMembers = 0;
		let totalProgress = 0;

		for (const project of this._projects) {
			const stats = project.getStats();
			totalTasks += stats.totalTasks;
			completedTasks += stats.completedTasks;
			totalMembers += stats.totalMembers;
			totalProgress += project.getOverallProgress();
		}

		const averageProgress = this._projects.length > 0 
			? Math.round(totalProgress / this._projects.length) 
			: 0;

		return {
			totalProjects,
			activeProjects,
			completedProjects,
			totalTasks,
			completedTasks,
			totalMembers,
			averageProgress
		};
	}

	// 오늘의 작업들
	getTodaysTasks(): { task: Task; project: Project }[] {
		const results: { task: Task; project: Project }[] = [];
		
		for (const project of this._projects) {
			const tasks = project.tasks.filter(task => task.isToday());
			tasks.forEach(task => {
				results.push({ task, project });
			});
		}

		return results;
	}

	// 지연된 작업들
	getOverdueTasks(): { task: Task; project: Project }[] {
		const results: { task: Task; project: Project }[] = [];
		
		for (const project of this._projects) {
			const tasks = project.tasks.filter(task => task.isOverdue());
			tasks.forEach(task => {
				results.push({ task, project });
			});
		}

		return results;
	}

	// === 데이터 관리 ===

	// 전체 데이터 내보내기
	exportData(): ProjectData[] {
		return this._projects.map(p => p.toJSON());
	}

	// 데이터 가져오기
	importData(data: ProjectData[]): void {
		this._projects = data.map(projectData => new Project(projectData));
		this.updateStore();
	}

	// 초기화
	clear(): void {
		this._projects = [];
		this.updateStore();
	}
}
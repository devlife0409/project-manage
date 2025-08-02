import { Task, type TaskData } from './Task';
import { TeamMember, type TeamMemberData } from './TeamMember';

export type ProjectStatus = '계획중' | '진행중' | '완료' | '보류';

export interface ProjectData {
	id?: string;
	name: string;
	description: string;
	status: ProjectStatus;
	tasks?: TaskData[];
	members?: TeamMemberData[];
	startDate?: string;
	endDate?: string;
}

export interface ProjectStats {
	totalTasks: number;
	completedTasks: number;
	inProgressTasks: number;
	plannedTasks: number;
	onHoldTasks: number;
	overdueTasks: number;
	completionRate: number;
	totalMembers: number;
	departmentCounts: Record<string, number>;
}

export class Project {
	public id: string;
	public name: string;
	public description: string;
	public status: ProjectStatus;
	public startDate?: string;
	public endDate?: string;
	private _tasks: Task[] = [];
	private _members: TeamMember[] = [];

	constructor(data: ProjectData) {
		this.id = data.id || this.generateId();
		this.name = data.name;
		this.description = data.description;
		this.status = data.status;
		this.startDate = data.startDate;
		this.endDate = data.endDate;
		
		// 작업들 초기화
		if (data.tasks) {
			this._tasks = data.tasks.map(taskData => new Task(taskData));
		}
		
		// 팀원들 초기화
		if (data.members) {
			this._members = data.members.map(memberData => new TeamMember(memberData));
		}
	}

	private generateId(): string {
		return `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	// Getter/Setter for tasks
	get tasks(): Task[] {
		return [...this._tasks];
	}

	get members(): TeamMember[] {
		return [...this._members];
	}

	// 프로젝트 업데이트
	update(updates: Partial<ProjectData>): Project {
		if (updates.name) this.name = updates.name;
		if (updates.description) this.description = updates.description;
		if (updates.status) this.status = updates.status;
		if (updates.startDate) this.startDate = updates.startDate;
		if (updates.endDate) this.endDate = updates.endDate;
		return this;
	}

	// === 작업 관리 메서드 ===
	
	addTask(taskData: Omit<TaskData, 'projectId'>): Task {
		const task = new Task({ ...taskData, projectId: this.id });
		this._tasks.push(task);
		return task;
	}

	updateTask(taskId: string, updates: Partial<TaskData>): Task | null {
		const task = this._tasks.find(t => t.id === taskId);
		if (task) {
			task.update(updates);
			return task;
		}
		return null;
	}

	deleteTask(taskId: string): boolean {
		const index = this._tasks.findIndex(t => t.id === taskId);
		if (index !== -1) {
			this._tasks.splice(index, 1);
			return true;
		}
		return false;
	}

	getTaskById(taskId: string): Task | null {
		return this._tasks.find(t => t.id === taskId) || null;
	}

	getTasksByStatus(status: Task['status']): Task[] {
		return this._tasks.filter(t => t.status === status);
	}

	getTasksByAssignee(assignee: string): Task[] {
		return this._tasks.filter(t => t.assignee === assignee);
	}

	getTasksInDateRange(startDate: Date, endDate: Date): Task[] {
		return this._tasks.filter(t => t.isInDateRange(startDate, endDate));
	}

	// === 팀원 관리 메서드 ===
	
	addMember(memberData: Omit<TeamMemberData, 'id'>): TeamMember {
		const member = new TeamMember(memberData);
		this._members.push(member);
		return member;
	}

	updateMember(memberId: string, updates: Partial<TeamMemberData>): TeamMember | null {
		const member = this._members.find(m => m.id === memberId);
		if (member) {
			member.update(updates);
			return member;
		}
		return null;
	}

	deleteMember(memberId: string): boolean {
		const index = this._members.findIndex(m => m.id === memberId);
		if (index !== -1) {
			this._members.splice(index, 1);
			return true;
		}
		return false;
	}

	getMemberById(memberId: string): TeamMember | null {
		return this._members.find(m => m.id === memberId) || null;
	}

	getMemberByName(name: string): TeamMember | null {
		return this._members.find(m => m.name === name) || null;
	}

	getMembersByDepartment(department: string): TeamMember[] {
		return this._members.filter(m => m.department === department);
	}

	// === 통계 및 분석 메서드 ===
	
	getStats(): ProjectStats {
		const totalTasks = this._tasks.length;
		const completedTasks = this.getTasksByStatus('completed').length;
		const inProgressTasks = this.getTasksByStatus('in-progress').length;
		const plannedTasks = this.getTasksByStatus('planned').length;
		const onHoldTasks = this.getTasksByStatus('on-hold').length;
		const overdueTasks = this._tasks.filter(t => t.isOverdue()).length;
		const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

		const departmentCounts = this._members.reduce((acc, member) => {
			const dept = member.department || '기타';
			acc[dept] = (acc[dept] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		return {
			totalTasks,
			completedTasks,
			inProgressTasks,
			plannedTasks,
			onHoldTasks,
			overdueTasks,
			completionRate,
			totalMembers: this._members.length,
			departmentCounts
		};
	}

	// 프로젝트 진행률 계산
	getOverallProgress(): number {
		if (this._tasks.length === 0) return 0;
		const totalProgress = this._tasks.reduce((sum, task) => sum + task.progress, 0);
		return Math.round(totalProgress / this._tasks.length);
	}

	// 마감일까지 남은 일수
	getDaysUntilDeadline(): number | null {
		if (!this.endDate) return null;
		const today = new Date();
		const deadline = new Date(this.endDate);
		const diffTime = deadline.getTime() - today.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	// 시리얼화
	toJSON(): ProjectData {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			status: this.status,
			startDate: this.startDate,
			endDate: this.endDate,
			tasks: this._tasks.map(t => t.toJSON()),
			members: this._members.map(m => m.toJSON())
		};
	}

	// 복사본 생성
	clone(): Project {
		return new Project(this.toJSON());
	}
}
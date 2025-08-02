export type TaskStatus = 'planned' | 'in-progress' | 'completed' | 'on-hold';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskData {
	id?: string;
	name: string;
	description?: string;
	assignee: string;
	status: TaskStatus;
	priority: TaskPriority;
	startDate: string;
	endDate: string;
	progress: number;
	projectId: string;
	dependencies?: string[];
	color?: string;
}

export class Task {
	public id: string;
	public name: string;
	public description?: string;
	public assignee: string;
	public status: TaskStatus;
	public priority: TaskPriority;
	public startDate: string;
	public endDate: string;
	public progress: number;
	public projectId: string;
	public dependencies: string[];
	public color?: string;

	constructor(data: TaskData) {
		this.id = data.id || this.generateId();
		this.name = data.name;
		this.description = data.description;
		this.assignee = data.assignee;
		this.status = data.status;
		this.priority = data.priority;
		this.startDate = data.startDate;
		this.endDate = data.endDate;
		this.progress = data.progress;
		this.projectId = data.projectId;
		this.dependencies = data.dependencies || [];
		this.color = data.color;
	}

	private generateId(): string {
		return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	// 작업 업데이트
	update(updates: Partial<TaskData>): Task {
		Object.assign(this, updates);
		return this;
	}

	// 진행률 업데이트
	setProgress(progress: number): Task {
		this.progress = Math.max(0, Math.min(100, progress));
		
		// 진행률에 따라 상태 자동 업데이트
		if (progress === 100 && this.status !== 'completed') {
			this.status = 'completed';
		} else if (progress > 0 && this.status === 'planned') {
			this.status = 'in-progress';
		}
		
		return this;
	}

	// 상태 변경
	setStatus(status: TaskStatus): Task {
		this.status = status;
		
		// 상태에 따른 진행률 자동 조정
		if (status === 'completed' && this.progress < 100) {
			this.progress = 100;
		} else if (status === 'planned' && this.progress > 0) {
			this.progress = 0;
		}
		
		return this;
	}

	// 기간 내에 있는지 확인
	isInDateRange(startDate: Date, endDate: Date): boolean {
		const taskStart = new Date(this.startDate);
		const taskEnd = new Date(this.endDate);
		return taskStart <= endDate && taskEnd >= startDate;
	}

	// 오늘 일정인지 확인
	isToday(): boolean {
		const today = new Date();
		const taskStart = new Date(this.startDate);
		const taskEnd = new Date(this.endDate);
		return taskStart <= today && taskEnd >= today;
	}

	// 지연된 작업인지 확인
	isOverdue(): boolean {
		const today = new Date();
		const taskEnd = new Date(this.endDate);
		return taskEnd < today && this.status !== 'completed';
	}

	// 시리얼화
	toJSON(): TaskData {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			assignee: this.assignee,
			status: this.status,
			priority: this.priority,
			startDate: this.startDate,
			endDate: this.endDate,
			progress: this.progress,
			projectId: this.projectId,
			dependencies: this.dependencies,
			color: this.color
		};
	}

	// 복사본 생성
	clone(): Task {
		return new Task(this.toJSON());
	}
}
export interface GlobalTeamMemberData {
	id?: string;
	name: string;
	email: string;
	position: string; // 직급 (예: 사원, 주임, 대리, 과장, 차장, 부장)
	jobTitle: string; // 직책 (예: 프론트엔드 개발자, 백엔드 개발자, UI/UX 디자이너, PM)
	department: string; // 부서 (예: 개발팀, 디자인팀, 기획팀, QA팀)
	avatar?: string;
	joinDate: string; // 입사일
	phone?: string; // 연락처
	status: 'active' | 'inactive' | 'on_leave'; // 재직상태
}

export class GlobalTeamMember {
	public id: string;
	public name: string;
	public email: string;
	public position: string;
	public jobTitle: string;
	public department: string;
	public avatar?: string;
	public joinDate: string;
	public phone?: string;
	public status: 'active' | 'inactive' | 'on_leave';

	constructor(data: GlobalTeamMemberData) {
		this.id = data.id || this.generateId();
		this.name = data.name;
		this.email = data.email;
		this.position = data.position;
		this.jobTitle = data.jobTitle;
		this.department = data.department;
		this.avatar = data.avatar;
		this.joinDate = data.joinDate;
		this.phone = data.phone;
		this.status = data.status;
	}

	private generateId(): string {
		return `global-member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	update(updates: Partial<GlobalTeamMemberData>): GlobalTeamMember {
		Object.assign(this, updates);
		return this;
	}

	getInitials(): string {
		return this.name
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	getWorkingMonths(): number {
		const joinDate = new Date(this.joinDate);
		const today = new Date();
		const diffTime = Math.abs(today.getTime() - joinDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		return diffMonths;
	}

	getWorkingPeriodText(): string {
		const months = this.getWorkingMonths();
		if (months < 12) {
			return `${months}개월`;
		} else {
			const years = Math.floor(months / 12);
			const remainingMonths = months % 12;
			return remainingMonths > 0 ? `${years}년 ${remainingMonths}개월` : `${years}년`;
		}
	}

	isValidEmail(): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(this.email);
	}

	getPositionBadgeColor(): string {
		if (this.position.includes('부장') || this.position.includes('이사')) {
			return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
		}
		if (this.position.includes('차장') || this.position.includes('과장')) {
			return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
		}
		if (this.position.includes('대리') || this.position.includes('주임')) {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
		}
		return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
	}

	getJobTitleBadgeColor(): string {
		if (this.jobTitle.includes('개발자')) {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
		}
		if (this.jobTitle.includes('디자이너')) {
			return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
		}
		if (this.jobTitle.includes('PM') || this.jobTitle.includes('매니저')) {
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		}
		if (this.jobTitle.includes('QA')) {
			return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
		}
		return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
	}

	getStatusBadgeColor(): string {
		switch (this.status) {
			case 'active':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			case 'inactive':
				return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
			case 'on_leave':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
		}
	}

	getStatusText(): string {
		switch (this.status) {
			case 'active':
				return '재직중';
			case 'inactive':
				return '퇴사';
			case 'on_leave':
				return '휴직중';
			default:
				return '알 수 없음';
		}
	}

	toJSON(): GlobalTeamMemberData {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			position: this.position,
			jobTitle: this.jobTitle,
			department: this.department,
			avatar: this.avatar,
			joinDate: this.joinDate,
			phone: this.phone,
			status: this.status
		};
	}

	clone(): GlobalTeamMember {
		return new GlobalTeamMember(this.toJSON());
	}
}
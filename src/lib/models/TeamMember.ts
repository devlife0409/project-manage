export interface TeamMemberData {
	id?: string;
	name: string;
	email: string;
	role: string;
	avatar?: string;
	department?: string;
	joinDate: string;
}

export class TeamMember {
	public id: string;
	public name: string;
	public email: string;
	public role: string;
	public avatar?: string;
	public department?: string;
	public joinDate: string;

	constructor(data: TeamMemberData) {
		this.id = data.id || this.generateId();
		this.name = data.name;
		this.email = data.email;
		this.role = data.role;
		this.avatar = data.avatar;
		this.department = data.department;
		this.joinDate = data.joinDate;
	}

	private generateId(): string {
		return `member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	// 팀원 정보 업데이트
	update(updates: Partial<TeamMemberData>): TeamMember {
		Object.assign(this, updates);
		return this;
	}

	// 이름 이니셜 생성
	getInitials(): string {
		return this.name
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	// 근무 기간 계산 (개월 수)
	getWorkingMonths(): number {
		const joinDate = new Date(this.joinDate);
		const today = new Date();
		const diffTime = Math.abs(today.getTime() - joinDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		return diffMonths;
	}

	// 근무 기간 텍스트
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

	// 이메일 검증
	isValidEmail(): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(this.email);
	}

	// 역할별 색상 클래스 반환
	getRoleBadgeColor(): string {
		if (this.role.includes('개발자')) {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
		}
		if (this.role.includes('디자이너')) {
			return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
		}
		if (this.role.includes('매니저')) {
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		}
		if (this.role.includes('QA')) {
			return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
		}
		return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
	}

	// 시리얼화
	toJSON(): TeamMemberData {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			role: this.role,
			avatar: this.avatar,
			department: this.department,
			joinDate: this.joinDate
		};
	}

	// 복사본 생성
	clone(): TeamMember {
		return new TeamMember(this.toJSON());
	}
}
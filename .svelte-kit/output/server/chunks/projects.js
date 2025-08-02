import { w as writable } from "./index.js";
class Task {
  id;
  name;
  description;
  assignee;
  status;
  priority;
  startDate;
  endDate;
  progress;
  projectId;
  dependencies;
  color;
  constructor(data) {
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
  generateId() {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  // 작업 업데이트
  update(updates) {
    Object.assign(this, updates);
    return this;
  }
  // 진행률 업데이트
  setProgress(progress) {
    this.progress = Math.max(0, Math.min(100, progress));
    if (progress === 100 && this.status !== "completed") {
      this.status = "completed";
    } else if (progress > 0 && this.status === "planned") {
      this.status = "in-progress";
    }
    return this;
  }
  // 상태 변경
  setStatus(status) {
    this.status = status;
    if (status === "completed" && this.progress < 100) {
      this.progress = 100;
    } else if (status === "planned" && this.progress > 0) {
      this.progress = 0;
    }
    return this;
  }
  // 기간 내에 있는지 확인
  isInDateRange(startDate, endDate) {
    const taskStart = new Date(this.startDate);
    const taskEnd = new Date(this.endDate);
    return taskStart <= endDate && taskEnd >= startDate;
  }
  // 오늘 일정인지 확인
  isToday() {
    const today = /* @__PURE__ */ new Date();
    const taskStart = new Date(this.startDate);
    const taskEnd = new Date(this.endDate);
    return taskStart <= today && taskEnd >= today;
  }
  // 지연된 작업인지 확인
  isOverdue() {
    const today = /* @__PURE__ */ new Date();
    const taskEnd = new Date(this.endDate);
    return taskEnd < today && this.status !== "completed";
  }
  // 시리얼화
  toJSON() {
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
  clone() {
    return new Task(this.toJSON());
  }
}
class TeamMember {
  id;
  name;
  email;
  role;
  avatar;
  department;
  joinDate;
  constructor(data) {
    this.id = data.id || this.generateId();
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.avatar = data.avatar;
    this.department = data.department;
    this.joinDate = data.joinDate;
  }
  generateId() {
    return `member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  // 팀원 정보 업데이트
  update(updates) {
    Object.assign(this, updates);
    return this;
  }
  // 이름 이니셜 생성
  getInitials() {
    return this.name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase().slice(0, 2);
  }
  // 근무 기간 계산 (개월 수)
  getWorkingMonths() {
    const joinDate = new Date(this.joinDate);
    const today = /* @__PURE__ */ new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1e3 * 60 * 60 * 24 * 30));
    return diffMonths;
  }
  // 근무 기간 텍스트
  getWorkingPeriodText() {
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
  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
  // 역할별 색상 클래스 반환
  getRoleBadgeColor() {
    if (this.role.includes("개발자")) {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
    if (this.role.includes("디자이너")) {
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    }
    if (this.role.includes("매니저")) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
    if (this.role.includes("QA")) {
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
  // 시리얼화
  toJSON() {
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
  clone() {
    return new TeamMember(this.toJSON());
  }
}
class Project {
  id;
  name;
  description;
  status;
  startDate;
  endDate;
  _tasks = [];
  _members = [];
  constructor(data) {
    this.id = data.id || this.generateId();
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    if (data.tasks) {
      this._tasks = data.tasks.map((taskData) => new Task(taskData));
    }
    if (data.members) {
      this._members = data.members.map((memberData) => new TeamMember(memberData));
    }
  }
  generateId() {
    return `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  // Getter/Setter for tasks
  get tasks() {
    return [...this._tasks];
  }
  get members() {
    return [...this._members];
  }
  // 프로젝트 업데이트
  update(updates) {
    if (updates.name) this.name = updates.name;
    if (updates.description) this.description = updates.description;
    if (updates.status) this.status = updates.status;
    if (updates.startDate) this.startDate = updates.startDate;
    if (updates.endDate) this.endDate = updates.endDate;
    return this;
  }
  // === 작업 관리 메서드 ===
  addTask(taskData) {
    const task = new Task({ ...taskData, projectId: this.id });
    this._tasks.push(task);
    return task;
  }
  updateTask(taskId, updates) {
    const task = this._tasks.find((t) => t.id === taskId);
    if (task) {
      task.update(updates);
      return task;
    }
    return null;
  }
  deleteTask(taskId) {
    const index = this._tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      this._tasks.splice(index, 1);
      return true;
    }
    return false;
  }
  getTaskById(taskId) {
    return this._tasks.find((t) => t.id === taskId) || null;
  }
  getTasksByStatus(status) {
    return this._tasks.filter((t) => t.status === status);
  }
  getTasksByAssignee(assignee) {
    return this._tasks.filter((t) => t.assignee === assignee);
  }
  getTasksInDateRange(startDate, endDate) {
    return this._tasks.filter((t) => t.isInDateRange(startDate, endDate));
  }
  // === 팀원 관리 메서드 ===
  addMember(memberData) {
    const member = new TeamMember(memberData);
    this._members.push(member);
    return member;
  }
  updateMember(memberId, updates) {
    const member = this._members.find((m) => m.id === memberId);
    if (member) {
      member.update(updates);
      return member;
    }
    return null;
  }
  deleteMember(memberId) {
    const index = this._members.findIndex((m) => m.id === memberId);
    if (index !== -1) {
      this._members.splice(index, 1);
      return true;
    }
    return false;
  }
  getMemberById(memberId) {
    return this._members.find((m) => m.id === memberId) || null;
  }
  getMemberByName(name) {
    return this._members.find((m) => m.name === name) || null;
  }
  getMembersByDepartment(department) {
    return this._members.filter((m) => m.department === department);
  }
  // === 통계 및 분석 메서드 ===
  getStats() {
    const totalTasks = this._tasks.length;
    const completedTasks = this.getTasksByStatus("completed").length;
    const inProgressTasks = this.getTasksByStatus("in-progress").length;
    const plannedTasks = this.getTasksByStatus("planned").length;
    const onHoldTasks = this.getTasksByStatus("on-hold").length;
    const overdueTasks = this._tasks.filter((t) => t.isOverdue()).length;
    const completionRate = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;
    const departmentCounts = this._members.reduce((acc, member) => {
      const dept = member.department || "기타";
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});
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
  getOverallProgress() {
    if (this._tasks.length === 0) return 0;
    const totalProgress = this._tasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / this._tasks.length);
  }
  // 마감일까지 남은 일수
  getDaysUntilDeadline() {
    if (!this.endDate) return null;
    const today = /* @__PURE__ */ new Date();
    const deadline = new Date(this.endDate);
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  }
  // 시리얼화
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      startDate: this.startDate,
      endDate: this.endDate,
      tasks: this._tasks.map((t) => t.toJSON()),
      members: this._members.map((m) => m.toJSON())
    };
  }
  // 복사본 생성
  clone() {
    return new Project(this.toJSON());
  }
}
class ProjectManager {
  _projects = [];
  _store;
  constructor(initialData) {
    if (initialData) {
      this._projects = initialData.map((data) => new Project(data));
    }
    this._store = writable(this._projects);
  }
  // Svelte store 반환
  get store() {
    return this._store;
  }
  // 현재 프로젝트 목록 반환
  get projects() {
    return [...this._projects];
  }
  // 스토어 업데이트
  updateStore() {
    this._store.set([...this._projects]);
  }
  // === 프로젝트 CRUD ===
  createProject(projectData) {
    const project = new Project(projectData);
    this._projects.push(project);
    this.updateStore();
    return project;
  }
  getProjectById(projectId) {
    return this._projects.find((p) => p.id === projectId) || null;
  }
  updateProject(projectId, updates) {
    const project = this.getProjectById(projectId);
    if (project) {
      project.update(updates);
      this.updateStore();
      return project;
    }
    return null;
  }
  deleteProject(projectId) {
    const index = this._projects.findIndex((p) => p.id === projectId);
    if (index !== -1) {
      this._projects.splice(index, 1);
      this.updateStore();
      return true;
    }
    return false;
  }
  // === 작업 관리 ===
  addTask(projectId, taskData) {
    const project = this.getProjectById(projectId);
    if (project) {
      const task = project.addTask(taskData);
      this.updateStore();
      return task;
    }
    return null;
  }
  updateTask(taskId, updates) {
    for (const project of this._projects) {
      const task = project.updateTask(taskId, updates);
      if (task) {
        this.updateStore();
        return task;
      }
    }
    return null;
  }
  deleteTask(taskId) {
    for (const project of this._projects) {
      if (project.deleteTask(taskId)) {
        this.updateStore();
        return true;
      }
    }
    return false;
  }
  getTaskById(taskId) {
    for (const project of this._projects) {
      const task = project.getTaskById(taskId);
      if (task) {
        return { task, project };
      }
    }
    return null;
  }
  // === 팀원 관리 ===
  addMember(projectId, memberData) {
    const project = this.getProjectById(projectId);
    if (project) {
      const member = project.addMember(memberData);
      this.updateStore();
      return member;
    }
    return null;
  }
  updateMember(memberId, updates) {
    for (const project of this._projects) {
      const member = project.updateMember(memberId, updates);
      if (member) {
        this.updateStore();
        return member;
      }
    }
    return null;
  }
  deleteMember(memberId) {
    for (const project of this._projects) {
      if (project.deleteMember(memberId)) {
        this.updateStore();
        return true;
      }
    }
    return false;
  }
  getMemberById(memberId) {
    for (const project of this._projects) {
      const member = project.getMemberById(memberId);
      if (member) {
        return { member, project };
      }
    }
    return null;
  }
  // === 검색 및 필터링 ===
  searchProjects(query) {
    const lowercaseQuery = query.toLowerCase();
    return this._projects.filter(
      (project) => project.name.toLowerCase().includes(lowercaseQuery) || project.description.toLowerCase().includes(lowercaseQuery)
    );
  }
  getProjectsByStatus(status) {
    return this._projects.filter((p) => p.status === status);
  }
  searchTasks(query) {
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    for (const project of this._projects) {
      const tasks = project.tasks.filter(
        (task) => task.name.toLowerCase().includes(lowercaseQuery) || task.description?.toLowerCase().includes(lowercaseQuery) || task.assignee.toLowerCase().includes(lowercaseQuery)
      );
      tasks.forEach((task) => {
        results.push({ task, project });
      });
    }
    return results;
  }
  searchMembers(query) {
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    for (const project of this._projects) {
      const members = project.members.filter(
        (member) => member.name.toLowerCase().includes(lowercaseQuery) || member.email.toLowerCase().includes(lowercaseQuery) || member.role.toLowerCase().includes(lowercaseQuery)
      );
      members.forEach((member) => {
        results.push({ member, project });
      });
    }
    return results;
  }
  // === 통계 및 분석 ===
  getOverallStats() {
    const totalProjects = this._projects.length;
    const activeProjects = this.getProjectsByStatus("진행중").length;
    const completedProjects = this.getProjectsByStatus("완료").length;
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
    const averageProgress = this._projects.length > 0 ? Math.round(totalProgress / this._projects.length) : 0;
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
  getTodaysTasks() {
    const results = [];
    for (const project of this._projects) {
      const tasks = project.tasks.filter((task) => task.isToday());
      tasks.forEach((task) => {
        results.push({ task, project });
      });
    }
    return results;
  }
  // 지연된 작업들
  getOverdueTasks() {
    const results = [];
    for (const project of this._projects) {
      const tasks = project.tasks.filter((task) => task.isOverdue());
      tasks.forEach((task) => {
        results.push({ task, project });
      });
    }
    return results;
  }
  // === 데이터 관리 ===
  // 전체 데이터 내보내기
  exportData() {
    return this._projects.map((p) => p.toJSON());
  }
  // 데이터 가져오기
  importData(data) {
    this._projects = data.map((projectData) => new Project(projectData));
    this.updateStore();
  }
  // 초기화
  clear() {
    this._projects = [];
    this.updateStore();
  }
}
const initialProjects = [
  {
    id: "1",
    name: "웹사이트 리뉴얼",
    description: "회사 웹사이트를 새로운 디자인으로 리뉴얼",
    status: "진행중",
    members: [
      {
        id: "m1",
        name: "김개발",
        email: "dev.kim@company.com",
        role: "프론트엔드 개발자",
        department: "개발팀",
        joinDate: "2024-01-15"
      },
      {
        id: "m2",
        name: "박디자인",
        email: "design.park@company.com",
        role: "UI/UX 디자이너",
        department: "디자인팀",
        joinDate: "2024-02-01"
      },
      {
        id: "m3",
        name: "이프론트",
        email: "frontend.lee@company.com",
        role: "프론트엔드 개발자",
        department: "개발팀",
        joinDate: "2024-01-20"
      },
      {
        id: "m4",
        name: "최백엔드",
        email: "backend.choi@company.com",
        role: "백엔드 개발자",
        department: "개발팀",
        joinDate: "2024-01-10"
      },
      {
        id: "m5",
        name: "테스터",
        email: "test@company.com",
        role: "QA 엔지니어",
        department: "품질보증팀",
        joinDate: "2024-03-01"
      }
    ],
    tasks: [
      {
        id: "1-1",
        name: "요구사항 분석",
        description: "프로젝트 요구사항 정의 및 분석",
        assignee: "김개발",
        status: "completed",
        priority: "high",
        startDate: "2024-08-01",
        endDate: "2024-08-05",
        progress: 100,
        projectId: "1",
        color: "bg-blue-500"
      },
      {
        id: "1-2",
        name: "UI/UX 디자인",
        description: "사용자 인터페이스 및 경험 디자인",
        assignee: "박디자인",
        status: "in-progress",
        priority: "high",
        startDate: "2024-08-05",
        endDate: "2024-08-15",
        progress: 75,
        projectId: "1",
        dependencies: ["1-1"],
        color: "bg-green-500"
      },
      {
        id: "1-3",
        name: "프론트엔드 개발",
        description: "React 기반 프론트엔드 개발",
        assignee: "이프론트",
        status: "in-progress",
        priority: "medium",
        startDate: "2024-08-10",
        endDate: "2024-08-25",
        progress: 60,
        projectId: "1",
        dependencies: ["1-2"],
        color: "bg-purple-500"
      },
      {
        id: "1-4",
        name: "백엔드 API 개발",
        description: "RESTful API 서버 개발",
        assignee: "최백엔드",
        status: "planned",
        priority: "high",
        startDate: "2024-08-15",
        endDate: "2024-08-30",
        progress: 20,
        projectId: "1",
        dependencies: ["1-1"],
        color: "bg-orange-500"
      },
      {
        id: "1-5",
        name: "통합 테스트",
        description: "전체 시스템 통합 테스트",
        assignee: "테스터",
        status: "planned",
        priority: "medium",
        startDate: "2024-08-25",
        endDate: "2024-09-05",
        progress: 0,
        projectId: "1",
        dependencies: ["1-3", "1-4"],
        color: "bg-red-500"
      }
    ]
  },
  {
    id: "2",
    name: "모바일 앱 개발",
    description: "iOS/Android 앱 개발 프로젝트",
    status: "진행중",
    members: [
      {
        id: "m6",
        name: "기획자",
        email: "plan@company.com",
        role: "프로덕트 매니저",
        department: "기획팀",
        joinDate: "2024-02-15"
      },
      {
        id: "m7",
        name: "iOS개발자",
        email: "ios@company.com",
        role: "iOS 개발자",
        department: "개발팀",
        joinDate: "2024-03-01"
      }
    ],
    tasks: [
      {
        id: "2-1",
        name: "앱 기획",
        assignee: "기획자",
        status: "completed",
        priority: "high",
        startDate: "2024-08-01",
        endDate: "2024-08-10",
        progress: 100,
        projectId: "2",
        color: "bg-blue-500"
      },
      {
        id: "2-2",
        name: "iOS 개발",
        assignee: "iOS개발자",
        status: "in-progress",
        priority: "high",
        startDate: "2024-08-10",
        endDate: "2024-09-15",
        progress: 45,
        projectId: "2",
        dependencies: ["2-1"],
        color: "bg-green-500"
      }
    ]
  },
  {
    id: "3",
    name: "API 서버 구축",
    description: "RESTful API 서버 구축 및 배포",
    status: "완료",
    members: [
      {
        id: "m8",
        name: "시니어개발자",
        email: "senior@company.com",
        role: "시니어 개발자",
        department: "개발팀",
        joinDate: "2023-12-01"
      },
      {
        id: "m9",
        name: "백엔드개발자",
        email: "backend@company.com",
        role: "백엔드 개발자",
        department: "개발팀",
        joinDate: "2024-01-05"
      }
    ],
    tasks: [
      {
        id: "3-1",
        name: "서버 아키텍처 설계",
        assignee: "시니어개발자",
        status: "completed",
        priority: "high",
        startDate: "2024-07-01",
        endDate: "2024-07-15",
        progress: 100,
        projectId: "3",
        color: "bg-blue-500"
      },
      {
        id: "3-2",
        name: "API 개발",
        assignee: "백엔드개발자",
        status: "completed",
        priority: "high",
        startDate: "2024-07-15",
        endDate: "2024-08-15",
        progress: 100,
        projectId: "3",
        dependencies: ["3-1"],
        color: "bg-green-500"
      }
    ]
  }
];
const projectManager = new ProjectManager(initialProjects);
const projects = projectManager.store;
function getStatusColor(status) {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "in-progress":
      return "bg-blue-500";
    case "planned":
      return "bg-gray-500";
    case "on-hold":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}
function getPriorityColor(priority) {
  switch (priority) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-yellow-500";
    case "low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
}
export {
  getPriorityColor as a,
  getStatusColor as g,
  projects as p
};

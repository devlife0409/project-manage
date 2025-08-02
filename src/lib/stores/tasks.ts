// 클래스 기반 모델들과 매니저를 다시 export하여 기존 컴포넌트들과의 호환성 유지
export { Task, type TaskData, type TaskStatus, type TaskPriority } from '../models/Task';
export { TeamMember, type TeamMemberData } from '../models/TeamMember';
export { Project, type ProjectData, type ProjectStatus } from '../models/Project';
export { projectManager, projects, getProjectById, addTask, updateTask, deleteTask, addMember, updateMember, deleteMember, getStatusColor, getPriorityColor } from './projects';

// projectManager import
import { projectManager } from './projects';

// 편의 함수들 - 기존 코드와의 호환성 유지
export const getTasksByProjectId = (projectId: string) => {
	const project = projectManager.getProjectById(projectId);
	return project?.tasks || [];
};

export const getMembersByProjectId = (projectId: string) => {
	const project = projectManager.getProjectById(projectId);
	return project?.members || [];
};
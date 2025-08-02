/**
 * UI 관련 유틸리티 함수들
 */
import type { Task, TeamMember } from '$lib/stores/tasks';

export function getRoleBadgeColor(role: string): string {
	if (role.includes('개발자')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
	if (role.includes('디자이너')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
	if (role.includes('매니저')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
	if (role.includes('QA')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
	return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
}

export function getStatusBadgeClass(status: Task['status']): string {
	switch (status) {
		case 'completed':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		case 'in-progress':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
		case 'planned':
			return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
		case 'on-hold':
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
	}
}

export function getInitials(name: string): string {
	return name.charAt(0).toUpperCase();
}

export function getRandomColor(): string {
	const colors = [
		'bg-blue-500',
		'bg-green-500',
		'bg-purple-500',
		'bg-orange-500',
		'bg-red-500',
		'bg-pink-500',
		'bg-indigo-500',
		'bg-teal-500'
	];
	return colors[Math.floor(Math.random() * colors.length)];
}
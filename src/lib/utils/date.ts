/**
 * 날짜 관련 유틸리티 함수들
 */

export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('ko-KR');
}

export function formatDateRange(startDate: string, endDate: string): string {
	return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
}

export function isToday(dateString: string): boolean {
	const date = new Date(dateString);
	const today = new Date();
	return date.toDateString() === today.toDateString();
}

export function getDaysInMonth(year: number, month: number): number {
	return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
	return new Date(year, month, 1).getDay();
}
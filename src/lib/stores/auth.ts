import { writable } from 'svelte/store';

// 기본값을 false로 설정 (항상 로그아웃 상태로 시작)
export const isLoggedIn = writable(false);

export function login() {
	isLoggedIn.set(true);
}

export function logout() {
	isLoggedIn.set(false);
}
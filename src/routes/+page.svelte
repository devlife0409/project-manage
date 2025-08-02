<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Card from '$lib/components/ui/card.svelte';
	import { login } from '$lib/stores/auth';

	let email = '';
	let password = '';

	function handleLogin() {
		// 간단한 로그인 - 버튼만 누르면 로그인
		login();
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>로그인 - Project Management</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background px-4">
	<Card class="w-full max-w-md p-6 space-y-6">
		<div class="text-center space-y-2">
			<h1 class="text-2xl font-bold">로그인</h1>
			<p class="text-muted-foreground">프로젝트 관리 도구에 접속하세요</p>
		</div>
		
		<form on:submit|preventDefault={handleLogin} class="space-y-4">
			<div class="space-y-2">
				<Label for="email">이메일</Label>
				<Input
					id="email"
					type="email"
					placeholder="이메일을 입력하세요"
					bind:value={email}
				/>
			</div>
			
			<div class="space-y-2">
				<Label for="password">비밀번호</Label>
				<Input
					id="password"
					type="password"
					placeholder="비밀번호를 입력하세요"
					bind:value={password}
				/>
			</div>
			
			<Button type="submit" class="w-full">
				로그인
			</Button>
		</form>
		
		<div class="text-center">
			<p class="text-sm text-muted-foreground">
				테스트용: 로그인 버튼을 클릭하면 바로 접속됩니다
			</p>
		</div>
	</Card>
</div>

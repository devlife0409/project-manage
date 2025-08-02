<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isLoggedIn } from '$lib/stores/auth';
	import Sidebar from '$lib/components/sidebar.svelte';

	let { children } = $props();

	onMount(() => {
		const unsubscribe = isLoggedIn.subscribe((loggedIn) => {
			if (!loggedIn) {
				goto('/login');
			}
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>대시보드 - Project Management</title>
</svelte:head>

{#if $isLoggedIn}
	<div class="flex h-screen overflow-hidden">
		<Sidebar />
		<main class="flex-1 overflow-auto bg-background">
			{@render children()}
		</main>
	</div>
{:else}
	<div class="flex items-center justify-center h-screen">
		<p>로그인 중...</p>
	</div>
{/if}
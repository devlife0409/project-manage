<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './ui/button.svelte';
	import { Sun, Moon } from 'lucide-svelte';

	let isDark = $state(true);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			document.body.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.body.classList.remove('dark');
		}
	}
</script>

<Button variant="ghost" size="icon" onclick={toggleTheme}>
	{#if isDark}
		<Sun class="h-5 w-5" />
	{:else}
		<Moon class="h-5 w-5" />
	{/if}
</Button>
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { X } from "lucide-svelte";

	type Props = HTMLAttributes<HTMLDivElement> & {
		open?: boolean;
		onClose?: () => void;
		children?: Snippet;
	};

	let { open = false, onClose, children, class: className, ...restProps }: Props = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose?.();
		}
	}

	function handleEscape(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose?.();
		}
	}
</script>

{#if open}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
		onclick={handleBackdropClick}
		onkeydown={handleEscape}
		role="dialog"
		aria-modal="true"
	>
		<div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
			<div
				class={cn(
					"grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
					className
				)}
				{...restProps}
			>
				<button
					onclick={onClose}
					class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none"
				>
					<X class="h-4 w-4" />
				</button>
				{#if children}
					{@render children()}
				{/if}
			</div>
		</div>
	</div>
{/if}
<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { logout } from '$lib/stores/auth';
	import { cn } from '$lib/utils';
	import ThemeToggle from './theme-toggle.svelte';
	import {
		Home,
		FolderOpen,
		Users,
		Calendar,
		BarChart3,
		Settings,
		Menu,
		X,
		LogOut,
		ChevronDown,
		ChevronRight
	} from 'lucide-svelte';

	let isCollapsed = $state(false);
	let expandedMenus = $state(new Set<string>());

	const menuItems = [
		{ 
			icon: Home, 
			label: '대시보드', 
			href: '/dashboard' 
		},
		{ 
			icon: FolderOpen, 
			label: '프로젝트', 
			href: '/dashboard/projects' 
		},
		{
			icon: Users,
			label: '팀 관리',
			children: [
				{ label: '팀원 관리', href: '/dashboard/members' },
				{ label: '팀 현황', href: '/dashboard/team' }
			]
		},
		{ 
			icon: Calendar, 
			label: '일정', 
			href: '/dashboard/calendar' 
		},
		{ 
			icon: BarChart3, 
			label: '보고서', 
			href: '/dashboard/reports' 
		},
		{ 
			icon: Settings, 
			label: '설정', 
			href: '/dashboard/settings' 
		}
	];

	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}

	function toggleMenu(label: string) {
		if (expandedMenus.has(label)) {
			expandedMenus.delete(label);
		} else {
			expandedMenus.add(label);
		}
		expandedMenus = new Set(expandedMenus);
	}

	function isMenuExpanded(label: string): boolean {
		return expandedMenus.has(label);
	}

	function isActiveMenu(item: any): boolean {
		if (item.href) {
			return $page.url.pathname === item.href;
		}
		if (item.children) {
			return item.children.some((child: any) => $page.url.pathname === child.href);
		}
		return false;
	}

	function handleLogout() {
		logout();
		goto('/login');
	}
</script>

<div class={cn(
	"flex flex-col h-screen bg-card border-r transition-all duration-300",
	isCollapsed ? "w-16" : "w-64"
)}>
	<!-- Header -->
	<div class="flex items-center justify-between p-4 border-b">
		{#if !isCollapsed}
			<h2 class="text-lg font-semibold">Project Manager</h2>
		{/if}
		<div class="flex items-center gap-2">
			{#if !isCollapsed}
				<ThemeToggle />
			{/if}
			<button
				onclick={toggleSidebar}
				class="p-1 hover:bg-accent hover:text-accent-foreground rounded-md"
			>
				{#if isCollapsed}
					<Menu class="h-5 w-5" />
				{:else}
					<X class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 p-2 space-y-1">
		{#each menuItems as item}
			{#if item.children}
				<!-- 하위 메뉴가 있는 경우 -->
				<div>
					<button
						onclick={() => toggleMenu(item.label)}
						class={cn(
							"flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
							isActiveMenu(item)
								? "bg-accent text-accent-foreground"
								: "hover:bg-accent hover:text-accent-foreground"
						)}
					>
						<svelte:component this={item.icon} class="h-5 w-5 shrink-0" />
						{#if !isCollapsed}
							<span class="flex-1 text-left">{item.label}</span>
							{#if isMenuExpanded(item.label)}
								<ChevronDown class="h-4 w-4" />
							{:else}
								<ChevronRight class="h-4 w-4" />
							{/if}
						{/if}
					</button>
					
					{#if !isCollapsed && isMenuExpanded(item.label)}
						<div class="ml-8 mt-1 space-y-1">
							{#each item.children as child}
								<a
									href={child.href}
									class={cn(
										"block px-3 py-2 rounded-md text-sm transition-colors",
										$page.url.pathname === child.href
											? "bg-accent text-accent-foreground font-medium"
											: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									)}
								>
									{child.label}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{:else}
				<!-- 일반 메뉴 -->
				<a
					href={item.href}
					class={cn(
						"flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
						$page.url.pathname === item.href
							? "bg-accent text-accent-foreground"
							: "hover:bg-accent hover:text-accent-foreground"
					)}
				>
					<svelte:component this={item.icon} class="h-5 w-5 shrink-0" />
					{#if !isCollapsed}
						<span>{item.label}</span>
					{/if}
				</a>
			{/if}
		{/each}
	</nav>

	<!-- Footer -->
	<div class="p-2 border-t">
		<button
			onclick={handleLogout}
			class={cn(
				"flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
				"hover:bg-destructive hover:text-destructive-foreground"
			)}
		>
			<LogOut class="h-5 w-5 shrink-0" />
			{#if !isCollapsed}
				<span>로그아웃</span>
			{/if}
		</button>
	</div>
</div>
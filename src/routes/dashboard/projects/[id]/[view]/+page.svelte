<script lang="ts">
	import { page } from '$app/stores';
	import Card from '$lib/components/ui/card.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import GanttChart from '$lib/components/gantt-chart.svelte';
	import EventCalendar from '$lib/components/event-calendar.svelte';
	import DataTable from '$lib/components/data-table.svelte';
	import { ArrowLeft, BarChart3, Calendar, Table } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	const projectId = $page.params.id;
	const viewType = $page.params.view;

	// 임시 프로젝트 데이터
	const projects = {
		'1': { name: '웹사이트 리뉴얼', description: '회사 웹사이트를 새로운 디자인으로 리뉴얼' },
		'2': { name: '모바일 앱 개발', description: 'iOS/Android 앱 개발 프로젝트' },
		'3': { name: 'API 서버 구축', description: 'RESTful API 서버 구축 및 배포' }
	};

	const project = projects[projectId as keyof typeof projects] || { name: '알 수 없는 프로젝트', description: '' };


	function getViewInfo(view: string) {
		switch (view) {
			case 'gantt':
				return { title: '간트차트 뷰', icon: BarChart3, color: 'text-blue-500' };
			case 'calendar':
				return { title: '캘린더 뷰', icon: Calendar, color: 'text-green-500' };
			case 'table':
				return { title: '테이블 뷰', icon: Table, color: 'text-purple-500' };
			default:
				return { title: '알 수 없는 뷰', icon: Table, color: 'text-gray-500' };
		}
	}

	const viewInfo = getViewInfo(viewType);

	function goBack() {
		goto('/dashboard/projects');
	}
</script>

<svelte:head>
	<title>{project.name} - {viewInfo.title}</title>
</svelte:head>

<div class="p-6 space-y-6">
	<div class="flex items-center gap-4">
		<Button variant="ghost" size="icon" onclick={goBack}>
			<ArrowLeft class="h-4 w-4" />
		</Button>
		<div>
			<h1 class="text-3xl font-bold flex items-center gap-3">
				<svelte:component this={viewInfo.icon} class="h-8 w-8 {viewInfo.color}" />
				{project.name}
			</h1>
			<p class="text-muted-foreground">{viewInfo.title}</p>
		</div>
	</div>

	<!-- 실제 뷰 컨텐츠 -->
	{#if viewType === 'gantt'}
		<div class="space-y-4">
			<Card class="p-4">
				<h2 class="text-xl font-semibold mb-4">📊 프로젝트 일정 간트차트</h2>
				<p class="text-muted-foreground mb-6">작업 일정과 의존성을 시각적으로 확인하세요</p>
				<GanttChart {projectId} />
			</Card>
		</div>
	{:else if viewType === 'calendar'}
		<div class="space-y-4">
			<Card class="p-4">
				<h2 class="text-xl font-semibold mb-4">📅 프로젝트 캘린더</h2>
				<p class="text-muted-foreground mb-6">프로젝트 일정과 마일스톤을 달력으로 확인하세요</p>
			</Card>
			<EventCalendar {projectId} />
		</div>
	{:else if viewType === 'table'}
		<div class="space-y-4">
			<Card class="p-4">
				<h2 class="text-xl font-semibold mb-4">📋 작업 목록 테이블</h2>
				<p class="text-muted-foreground mb-6">프로젝트의 모든 작업을 상세하게 관리하세요</p>
				<DataTable {projectId} />
			</Card>
		</div>
	{:else}
		<Card class="p-8">
			<div class="text-center space-y-4">
				<svelte:component this={viewInfo.icon} class="h-16 w-16 mx-auto {viewInfo.color}" />
				<div>
					<h2 class="text-2xl font-semibold">{viewInfo.title}</h2>
					<p class="text-muted-foreground mt-2">지원하지 않는 뷰 타입입니다.</p>
				</div>
			</div>
		</Card>
	{/if}
</div>
<script lang="ts">
	import type { PageProps } from './$types';
  import { resolve } from '$app/paths';
	import LikeButton from '$lib/components/LikeButton.svelte';

	let { data }: PageProps = $props();

	type FilterKey = 'all' | 'poem' | 'prose';
	type SortKey = 'latest' | 'oldest' | 'likes_desc' | 'likes_asc';

	const filterMenus: { id: FilterKey; label: string }[] = [
		{ id: 'all', label: '전체' },
		{ id: 'poem', label: '운문' },
		{ id: 'prose', label: '산문' }
	];

	const sortMenus: { id: SortKey; label: string }[] = [
		{ id: 'latest', label: '최신순' },
		{ id: 'oldest', label: '오래된순' },
		{ id: 'likes_desc', label: '좋아요 순' },
		{ id: 'likes_asc', label: '좋아요 역순' }
	];

	let filter = $state<FilterKey>('all');
	let sort = $state<SortKey>('latest');

	const typeLabel = (value: string) => {
		if (value === 'poem') return '운문';
		if (value === 'prose') return '산문';
		return value;
	};

	const formatDate = (value: string | null) => {
		if (!value) return '-';
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return '-';
		return new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', timeZone: 'Asia/Seoul' }).format(date);
	};

	const toTime = (value: string | null) => {
		if (!value) return 0;
		const time = new Date(value).getTime();
		return Number.isNaN(time) ? 0 : time;
	};

	const getVisibleWritings = () => {
		const list = data.writings ?? [];
		const filtered = filter === 'all' ? list : list.filter((writing) => writing.type === filter);

		return [...filtered].sort((a, b) => {
			if (sort === 'latest') return toTime(b.created_at) - toTime(a.created_at);
			if (sort === 'oldest') return toTime(a.created_at) - toTime(b.created_at);
			if (sort === 'likes_desc') return b.like_count - a.like_count;
			return a.like_count - b.like_count;
		});
	};

	let visibleWritings = $derived(getVisibleWritings());
</script>

<div class="my-80"></div>
<div class="mx-auto max-w-7xl space-y-2">
	<div class="flex flex-wrap items-center justify-between">
		<nav aria-label="작품 종류 선택 메뉴" class="w-full sm:w-auto">
			<ul class="flex w-full list-none items-center gap-0.5 rounded-lg border border-zinc-200 bg-white sm:w-auto">
				{#each filterMenus as menu (menu.id)}
					<li>
						<button
							type="button"
							onclick={() => (filter = menu.id)}
							aria-pressed={filter === menu.id}
							class={`inline-flex h-8 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
								filter === menu.id
									? 'bg-zinc-900 text-white'
									: 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
							}`}
						>
							{menu.label}
						</button>
					</li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="작품 리스트 정렬 선택 메뉴" class="w-full sm:w-auto">
			<ul
				class="flex w-full list-none items-center justify-end gap-1 rounded-lg border border-zinc-200 bg-white sm:w-auto"
			>
				{#each sortMenus as menu (menu.id)}
					<li>
						<button
							type="button"
							onclick={() => (sort = menu.id)}
							aria-pressed={sort === menu.id}
							class={`inline-flex h-8 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
								sort === menu.id
									? 'bg-zinc-900 text-white'
									: 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
							}`}
						>
							{menu.label}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="mx-auto max-w-7xl overflow-hidden rounded-lg border border-zinc-200">
		<table class="w-full text-sm">
			<thead class="[&_tr]:border-b">
				<tr class="border-zinc-200">
					<th class="h-10 w-[30%] px-4 text-left align-middle font-medium text-zinc-900">제목</th>
					<th class="h-10 w-[12%] px-4 text-left align-middle font-medium text-zinc-900">종류</th>
					<th class="h-10 w-[22%] px-4 text-left align-middle font-medium text-zinc-900">필자</th>
					<th class="h-10 w-[14%] px-4 text-left align-middle font-medium text-zinc-900">게시일</th>
					<th class="h-10 w-[12%] px-4 text-left align-middle font-medium text-zinc-900">좋아요</th>
					<th class="h-10 w-[8%] px-4 text-left align-middle font-medium text-zinc-900">댓글</th>
				</tr>
			</thead>
			<tbody class="[&_tr:last-child]:border-0">
				{#if visibleWritings.length === 0}
					<tr class="border-b border-zinc-200">
						<td colspan="6" class="p-4 text-center text-zinc-500">
							아직 등록된 작품이 없습니다.
						</td>
					</tr>
				{:else}
					{#each visibleWritings as writing (writing.id)}
						<tr class="border-b border-zinc-200 transition-colors hover:bg-zinc-50/50">
							<td class="p-4 align-middle font-medium">
								<a href={resolve(`/writing/${writing.id}`)} class="underline-offset-4 hover:underline">
									{writing.title}
								</a>
							</td>
							<td class="p-4 align-middle">{typeLabel(writing.type)}</td>
							<td class="p-4 align-middle">{writing.author?.pen_name ?? '???'}</td>
							<td class="p-4 align-middle">{formatDate(writing.created_at)}</td>
							<td class="p-4 align-middle">
								<LikeButton
									writingId={writing.id}
									initialLiked={writing.is_liked}
									initialCount={writing.like_count}
								/>
							</td>
							<td class="p-4 align-middle">{writing.review_count}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

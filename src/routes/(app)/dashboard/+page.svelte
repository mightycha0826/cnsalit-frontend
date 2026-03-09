<script>
	import WorkCard from '$lib/components/WorkCard.svelte';
	import { placeholderWorks } from '$lib/stores/user.js';

	let filter = $state('전체');
	const categories = ['전체', '운문', '산문'];

	let filtered = $derived(
		filter === '전체' ? placeholderWorks : placeholderWorks.filter((w) => w.category === filter)
	);
</script>

<div class="dashboard-page">
	<div class="page-inner">
		<header class="page-header">
			<div class="header-text">
				<h1 class="page-title">내 작품 대시보드</h1>
				<p class="page-subtitle">지금까지 작가님이 남기신 소중한 별자리들입니다.</p>
			</div>

			<div class="filter-tabs cosmic-glass">
				{#each categories as cat}
					<button class="filter-tab" class:active={filter === cat} onclick={() => (filter = cat)}>
						{cat}
					</button>
				{/each}
			</div>
		</header>

		<div class="work-grid">
			{#each filtered as work}
				<WorkCard {work} />
			{:else}
				<div class="empty-state cosmic-glass">
					<p>아직 출품된 작품이 없습니다.</p>
					<a href="/submit" class="btn-primary">첫 작품 출품하기</a>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.dashboard-page {
		padding: 0 20px;
	}

	.page-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 48px;
		flex-wrap: wrap;
		gap: 24px;
	}

	.page-title {
		font-family: 'Playfair Display', serif;
		font-size: 36px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 8px;
	}

	.page-subtitle {
		font-size: 16px;
		color: var(--text-secondary);
	}

	.filter-tabs {
		display: flex;
		gap: 6px;
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 100px;
		padding: 6px;
	}

	.filter-tab {
		padding: 10px 24px;
		border-radius: 100px;
		font-size: 14px;
		font-weight: 600;
		color: var(--text-secondary);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.filter-tab.active {
		background: var(--star-glow);
		color: var(--sky-midnight);
		box-shadow: 0 0 15px rgba(254, 240, 138, 0.3);
	}

	.filter-tab:not(.active):hover {
		background: rgba(255, 255, 255, 0.08);
		color: var(--text-primary);
	}

	.work-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 32px;
	}

	.empty-state {
		grid-column: 1 / -1;
		padding: 80px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
	}

	.empty-state p {
		font-size: 18px;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
		}
		.work-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

<!-- Student-made slight imperfection -->
<script>
	import LikeButton from './LikeButton.svelte';

	let { work } = $props();
</script>

<a href="/writing/{work.id}" class="work-card cosmic-glass">
	<div class="card-header">
		<span class="category-tag">{work.category}</span>
	</div>

	<div class="card-body">
		<h3 class="work-title">{work.title}</h3>
		<p class="author-line">by <span class="author-name">{work.author}</span></p>
	</div>

	<div class="card-footer">
		<span class="date-text">{work.date}</span>
		<div class="footer-actions">
			<div class="like-wrapper" onclick={(e) => e.stopPropagation()} role="none">
				<LikeButton count={work.likes} />
			</div>
			<div class="view-btn">
				<span>더보기</span>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path d="M5 12h14m-7-7 7 7-7 7" />
				</svg>
			</div>
		</div>
	</div>
</a>

<style>
	.work-card {
		text-decoration: none;
		padding: 32px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 24px;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		overflow: hidden;
	}

	.work-card:hover {
		transform: translateY(-8px);
		border-color: rgba(254, 240, 138, 0.4);
		box-shadow:
			0 20px 40px rgba(0, 0, 0, 0.4),
			var(--shadow-star);
	}

	.card-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.category-tag {
		font-size: 11px;
		font-weight: 700;
		color: var(--star-glow);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		background: rgba(254, 240, 138, 0.08);
		padding: 6px 12px;
		border-radius: 100px;
		border: 1px solid rgba(254, 240, 138, 0.15);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.work-title {
		font-family: 'Playfair Display', serif;
		font-size: 24px;
		font-weight: 700;
		line-height: 1.3;
		color: var(--white-star);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		letter-spacing: -0.01em;
	}

	.author-line {
		font-family: 'Pretendard', sans-serif;
		font-size: 14px;
		color: var(--text-secondary);
		margin: 0;
		letter-spacing: 0.02em;
	}

	.author-name {
		color: var(--text-primary);
		font-weight: 600;
	}

	.card-footer {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.date-text {
		font-family: 'Pretendard', sans-serif;
		font-size: 13px;
		font-weight: 400;
		color: var(--text-muted);
		opacity: 0.8;
	}

	.footer-actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.view-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--star-glow);
		text-decoration: none;
		font-size: 14px;
		font-weight: 700;
		transition: all 0.2s ease;
		padding: 8px 0;
	}

	.view-btn:hover {
		transform: translateX(4px);
		color: var(--white-star);
	}
</style>

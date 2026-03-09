<!-- Student-made slight imperfection -->
<script>
	let { stats } = $props();
</script>

<div class="hero-stats">
	<div class="stat-card cosmic-glass">
		<span class="stat-icon">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path d="M12 19l7-7 3 3-7 7-3-3zM12 19l-7-7-3 3 7 7 3-3zM12 11V3l7 7H5l7-7z" />
			</svg>
		</span>
		<div class="stat-data">
			<div class="stat-label">내 작품</div>
			<div class="stat-value">{stats.myWorks}<small>개</small></div>
			<div class="stat-detail">운문 2 · 산문 1</div>
		</div>
	</div>

	<div class="stat-card cosmic-glass">
		<span class="stat-icon">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path
					d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
				/>
			</svg>
		</span>
		<div class="stat-data">
			<div class="stat-label">총 좋아요</div>
			<div class="stat-value">{stats.totalLikes}<small>개</small></div>
			<div class="stat-detail">이번 주 +{stats.weeklyLikes}</div>
		</div>
	</div>

	<div class="stat-card cosmic-glass">
		<span class="stat-icon">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path
					d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
				/>
			</svg>
		</span>
		<div class="stat-data">
			<div class="stat-label">내가 쓴 댓글</div>
			<div class="stat-value">{stats.myReviews}<small>개</small></div>
			<div class="stat-detail">작가님의 소중한 감상평들</div>
		</div>
	</div>
</div>

<style>
	.hero-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 20px;
		margin-bottom: 48px;
	}

	.stat-card {
		padding: 32px;
		display: flex;
		gap: 20px;
		align-items: flex-start;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		border-color: rgba(254, 240, 138, 0.3);
		transform: translateY(-4px);
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(254, 240, 138, 0.1);
		color: var(--star-glow);
		border-radius: var(--radius-md);
	}

	.stat-data {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.stat-label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-secondary);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.stat-value {
		font-family: 'Playfair Display', serif;
		font-size: 32px;
		font-weight: 700;
		color: var(--white-star);
		line-height: 1.2;
		display: flex;
		align-items: baseline;
		gap: 4px;
	}

	.stat-value small {
		font-size: 16px;
		font-weight: 400;
		color: var(--text-muted);
	}

	.stat-detail {
		font-size: 13px;
		color: var(--text-muted);
	}
</style>

<script>
	import DashboardHero from '$lib/components/DashboardHero.svelte';
	import GlassButton from '$lib/components/GlassButton.svelte';
	import { placeholderUserStats } from '$lib/stores/user.js';
</script>

<div class="home-page">
	<div class="page-inner">
		<header class="home-header">
			<div class="welcome-section">
				<h1 class="welcome-title">안녕하세요, 작가님</h1>
				<p class="welcome-subtitle">오늘도 당신의 별자리를 그려보세요.</p>
			</div>
		</header>

		<section class="stats-section">
			<DashboardHero stats={placeholderUserStats} />
		</section>

		<section class="quick-actions cosmic-glass">
			<div class="action-content">
				<h2 class="action-title">새로운 작품을 시작할까요?</h2>
				<p class="action-desc">운문 또는 산문으로 당신의 영감을 기록하세요.</p>
				<div class="action-buttons">
					<GlassButton variant="primary" href="/submit">출품하기</GlassButton>
					<GlassButton variant="glass" href="/dashboard">내 작품 보기</GlassButton>
				</div>
			</div>
			<div class="action-visual">
				<!-- Subtle decorative element -->
				<div class="glow-sphere"></div>
			</div>
		</section>

		<section class="info-grid">
			<div class="info-card cosmic-glass">
				<h3>문학제 일정</h3>
				<p>작품 접수: ~ 2026.04.30</p>
				<p>결과 발표: 2026.05.15</p>
			</div>
			<div class="info-card cosmic-glass">
				<h3>유의사항</h3>
				<p>모든 작품은 창작물이어야 하며, 타 대회 중복 출품은 불가합니다.</p>
			</div>
		</section>
	</div>
</div>

<style>
	.home-page {
		padding: 0 20px;
	}

	.page-inner {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.home-header {
		margin-top: 20px;
	}

	.welcome-title {
		font-family: 'Playfair Display', serif;
		font-size: 36px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 8px;
	}

	.welcome-subtitle {
		font-size: 16px;
		color: var(--text-secondary);
	}

	.quick-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 60px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		position: relative;
		overflow: hidden;
	}

	.action-content {
		position: relative;
		z-index: 2;
		max-width: 500px;
	}

	.action-title {
		font-family: 'Playfair Display', serif;
		font-size: 32px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 16px;
	}

	.action-desc {
		font-size: 16px;
		color: var(--text-secondary);
		margin-bottom: 32px;
	}

	.action-buttons {
		display: flex;
		gap: 16px;
	}

	.action-visual {
		position: absolute;
		right: -50px;
		top: -50px;
		width: 300px;
		height: 300px;
		opacity: 0.5;
	}

	.glow-sphere {
		width: 100%;
		height: 100%;
		background: radial-gradient(circle, var(--star-glow) 0%, transparent 70%);
		filter: blur(40px);
		animation: pulse 4s ease-in-out infinite;
	}

	.info-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.info-card {
		padding: 32px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
	}

	.info-card h3 {
		font-size: 18px;
		font-weight: 600;
		color: var(--star-glow);
		margin-bottom: 16px;
		letter-spacing: 0.05em;
	}

	.info-card p {
		font-size: 14px;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 8px;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.6;
		}
	}

	@media (max-width: 768px) {
		.quick-actions {
			padding: 40px;
		}
		.info-grid {
			grid-template-columns: 1fr;
		}
		.action-buttons {
			flex-direction: column;
		}
	}
</style>

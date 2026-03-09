<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-page">
	<div class="error-card cosmic-glass">
		<div class="error-code">{page.status}</div>
		<h1 class="error-title">빛을 잃은 페이지</h1>
		<p class="error-msg">{page.error?.message || '죄송합니다. 요청하신 별을 찾을 수 없습니다.'}</p>
		<a href="/" class="btn-primary">홈으로 돌아가기</a>
	</div>
</div>

<style>
	.error-page {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
	}

	.error-card {
		max-width: 500px;
		width: 100%;
		padding: 60px 40px;
		text-align: center;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
	}

	.error-code {
		font-family: 'Playfair Display', serif;
		font-size: 82px;
		font-weight: 700;
		color: var(--star-glow);
		opacity: 0.3;
		line-height: 1;
		margin-bottom: 20px;
	}

	.error-title {
		font-family: 'Playfair Display', serif;
		font-size: 32px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 16px;
	}

	.error-msg {
		font-size: 16px;
		color: var(--text-secondary);
		margin-bottom: 32px;
		line-height: 1.6;
	}
</style>

<!-- Student-made slight imperfection -->
<script>
	import { goto } from '$app/navigation';

	function loginWith(/** @type {any} */ provider) {
		localStorage.setItem('geumbyeol_auth', 'demo');
		goto('/auth/profile');
	}
</script>

<div class="landing-page">
	<div class="stars-backdrop">
		<!-- More stars for the landing specifically -->
		<div class="stars-extra"></div>
	</div>

	<div class="content-wrapper">
		<header class="hero-section">
			<div class="year-accent">2026</div>
			<h1 class="festival-title">큰별문학제</h1>
			<p class="festival-subtitle">Starry Night over the Meadow</p>
			<div class="divider-line"></div>
			<p class="welcome-quote">"문학으로 빛나는 별들의 축제에 당신을 초대합니다."</p>
		</header>

		<div class="auth-box cosmic-glass">
			<h2 class="auth-title">시작하기</h2>
			<div class="btn-stack">
				<button class="login-btn google" onclick={() => loginWith('google')}>
					<span class="icon">
						<svg viewBox="0 0 24 24" width="20" height="20">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
					</span>
					<span>Google 계정으로 로그인</span>
				</button>
			</div>
			<footer class="box-footer">
				<p>학교 공식 문학제 작품 접수 시스템</p>
			</footer>
		</div>
	</div>
</div>

<style>
	.landing-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 24px;
		color: var(--white-star);
		position: relative;
		overflow: hidden;
	}

	.content-wrapper {
		width: 100%;
		max-width: 500px;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 60px;
		align-items: center;
	}

	.hero-section {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.year-accent {
		font-size: 14px;
		font-weight: 700;
		color: var(--star-glow);
		background: rgba(254, 240, 138, 0.1);
		padding: 6px 16px;
		border-radius: 100px;
		letter-spacing: 0.2em;
		margin-bottom: 24px;
		border: 1px solid rgba(254, 240, 138, 0.2);
	}

	.festival-title {
		font-family: 'Playfair Display', serif;
		font-size: 56px;
		font-weight: 800;
		line-height: 1.1;
		margin: 0;
		color: var(--white-star);
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
		letter-spacing: -0.01em;
		position: relative;
		z-index: 20;
	}

	.festival-subtitle {
		font-size: 16px;
		color: var(--text-secondary);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		margin-top: 12px;
	}

	.divider-line {
		width: 40px;
		height: 2px;
		background: var(--star-glow);
		margin: 32px 0;
		opacity: 0.5;
	}

	.welcome-quote {
		font-family: 'Playfair Display', serif;
		font-style: italic;
		font-size: 18px;
		color: var(--text-secondary);
		opacity: 0.9;
		max-width: 320px;
	}

	.auth-box {
		width: 100%;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: 40px;
		display: flex;
		flex-direction: column;
		gap: 32px;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
	}

	.auth-title {
		font-size: 18px;
		font-weight: 600;
		text-align: center;
		margin: 0;
		color: var(--text-primary);
	}

	.btn-stack {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.login-btn {
		width: 100%;
		height: 54px;
		display: flex;
		align-items: center;
		padding: 0 24px;
		gap: 16px;
		border-radius: var(--radius-md);
		border: none;
		background: white;
		color: #1f2937;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.login-btn:hover {
		background: #f9fafb;
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
	}

	.box-footer {
		text-align: center;
	}

	.box-footer p {
		font-size: 13px;
		color: var(--text-muted);
		margin: 0;
	}

	@media (max-width: 480px) {
		.festival-title {
			font-size: 42px;
		}
		.auth-box {
			padding: 32px 24px;
		}
	}
</style>

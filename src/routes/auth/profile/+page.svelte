<!-- Student-made slight imperfection -->
<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user.js';

	let studentID = $state('');
	let name = $state('');
	let penName = $state('');
	let errorMsg = $state('');

	function handleSubmit(/** @type {any} */ e) {
		e.preventDefault();
		errorMsg = '';

		if (!studentID.trim() || !name.trim() || !penName.trim()) {
			errorMsg = '모든 항목을 입력해주세요.';
			return;
		}
		if (!/^\d{5}$/.test(studentID.trim())) {
			errorMsg = '학번은 5자리 숫자여야 합니다 (예: 10101)';
			return;
		}

		user.set({
			studentID: studentID.trim(),
			name: name.trim(),
			penName: penName.trim()
		});

		goto('/dashboard');
	}
</script>

<div class="profile-page">
	<div class="profile-card cosmic-glass">
		<header class="card-header">
			<h1 class="page-title">작가 등록</h1>
			<p class="subtitle">큰별문학제의 밤을 함께 수놓을 정보를 입력해주세요</p>
		</header>

		{#if errorMsg}
			<div class="error-banner">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line x1="12" y1="16" x2="12.01" y2="16" />
				</svg>
				<span>{errorMsg}</span>
			</div>
		{/if}

		<form class="profile-form" onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="studentID">학번</label>
				<input
					id="studentID"
					type="text"
					bind:value={studentID}
					placeholder="예: 10101"
					maxlength="5"
					inputmode="numeric"
					required
				/>
			</div>

			<div class="form-group">
				<label for="name">이름</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					placeholder="실명을 입력하세요"
					maxlength="20"
					required
				/>
			</div>

			<div class="form-group">
				<label for="penName">필명 (Pen Name)</label>
				<input
					id="penName"
					type="text"
					bind:value={penName}
					placeholder="나만의 작가 이름을 적어보세요"
					maxlength="10"
					required
				/>
				<p class="field-info">작품 하단에 필명이 표시됩니다.</p>
			</div>

			<button type="submit" class="submit-action-btn">
				<span>저장하고 시작하기</span>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path d="M5 12h14m-7-7 7 7-7 7" />
				</svg>
			</button>
		</form>
	</div>
</div>

<style>
	.profile-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px 24px;
	}

	.profile-card {
		width: 100%;
		max-width: 480px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: 48px;
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
	}

	.card-header {
		text-align: center;
		margin-bottom: 40px;
	}

	.page-title {
		font-family: 'Playfair Display', serif;
		font-size: 32px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 12px;
	}

	.subtitle {
		font-size: 15px;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.error-banner {
		display: flex;
		align-items: center;
		gap: 10px;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: var(--radius-sm);
		padding: 14px 18px;
		font-size: 14px;
		color: #fca5a5;
		margin-bottom: 32px;
	}

	.profile-form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	label {
		font-size: 14px;
		font-weight: 600;
		color: var(--text-secondary);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	input {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		padding: 14px 18px;
		font-size: 16px;
		color: white;
		outline: none;
		transition: all 0.3s;
	}

	input:focus {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--star-glow);
		box-shadow: 0 0 15px rgba(254, 240, 138, 0.15);
	}

	input::placeholder {
		color: rgba(255, 255, 255, 0.2);
	}

	.field-info {
		font-size: 13px;
		color: var(--text-muted);
		margin: 0;
	}

	.submit-action-btn {
		margin-top: 12px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		background: var(--star-glow);
		color: var(--sky-midnight);
		border: none;
		border-radius: var(--radius-md);
		font-size: 16px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.submit-action-btn:hover {
		transform: scale(1.02);
		box-shadow: 0 0 30px rgba(254, 240, 138, 0.4);
	}
</style>

<!-- Student-made slight imperfection -->
<script>
	let step = $state('select'); // 'select' or 'write'
	let title = $state('');
	let category = $state('운문');
	let content = $state('');
	let charCount = $derived(content.length);
	let toast = $state({ show: false, msg: '', type: 'success' });

	/** @type {Object<string, number>} */
	const limits = {
		운문: 2000,
		산문: 20000
	};

	function selectCategory(/** @type {string} */ cat) {
		category = cat;
		step = 'write';
	}

	function goBack() {
		step = 'select';
	}

	function showToast(/** @type {string} */ msg, type = 'success') {
		toast = { show: true, msg, type };
		setTimeout(() => (toast = { ...toast, show: false }), 3000);
	}

	function handleSubmit(/** @type {any} */ e) {
		e.preventDefault();
		if (!title.trim() || !content.trim()) {
			showToast('제목과 내용을 모두 입력해주세요.', 'error');
			return;
		}
		if (content.length > limits[category]) {
			showToast(
				`${category}은(는) 최대 ${limits[category].toLocaleString()}자까지 가능합니다.`,
				'error'
			);
			return;
		}
		console.log('작품 제출:', { title, category, content });
		showToast('제출 완료! 작품이 접수되었습니다.');
		title = '';
		content = '';
		step = 'select';
	}
</script>

{#if toast.show}
	<div class="toast cosmic-glass" class:error={toast.type === 'error'}>
		<div class="toast-content">
			{#if toast.type === 'success'}
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
			{:else}
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line x1="12" y1="16" x2="12.01" y2="16" />
				</svg>
			{/if}
			<span>{toast.msg}</span>
		</div>
	</div>
{/if}

{#if step === 'select'}
	<div class="selection-grid">
		<button class="selection-card cosmic-glass" onclick={() => selectCategory('운문')}>
			<div class="card-icon">
				<svg
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M12 19l7-7 3 3-7 7-3-3zM12 19l-7-7-3 3 7 7 3-3zM12 11V3l7 7H5l7-7z" />
				</svg>
			</div>
			<div class="card-text">
				<h3 class="cat-name">운문</h3>
				<p class="cat-desc">시, 시조 등 영감을 짧고 강렬하게 수놓아보세요.</p>
				<span class="cat-limit">최대 2,000자</span>
			</div>
		</button>

		<button class="selection-card cosmic-glass" onclick={() => selectCategory('산문')}>
			<div class="card-icon">
				<svg
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
					<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
				</svg>
			</div>
			<div class="card-text">
				<h3 class="cat-name">산문</h3>
				<p class="cat-desc">소설, 수필 등 깊은 울림을 풍부하게 담아내보세요.</p>
				<span class="cat-limit">최대 20,000자</span>
			</div>
		</button>
	</div>
{:else}
	<div class="editor-header">
		<button class="back-btn" onclick={goBack}>
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
			>
				<path d="M19 12H5m7 7-7-7 7-7" />
			</svg>
			<span>장르 다시 고르기</span>
		</button>
		<div class="active-category">
			{category} 출품 중
		</div>
	</div>

	<form class="submit-form cosmic-glass" onsubmit={handleSubmit}>
		<div class="field">
			<label for="s-title">작품 제목</label>
			<input
				id="s-title"
				type="text"
				bind:value={title}
				placeholder="반짝이는 영감을 제목에 담아보세요"
				maxlength="100"
				required
			/>
		</div>

		<div class="field content-field">
			<label for="s-content">
				<span>작품 내용</span>
				<span class="char-count" class:over={charCount > limits[category] * 0.95}>
					{charCount.toLocaleString()} / {limits[category].toLocaleString()}
				</span>
			</label>
			<textarea
				id="s-content"
				bind:value={content}
				maxlength={limits[category]}
				placeholder={category === '운문'
					? '여기에 당신의 시상을 자유롭게 풀어주세요...'
					: '여기에 당신의 이야기를 깊고 풍부하게 펼쳐주세요...'}
				rows="16"
			></textarea>
		</div>

		<div class="form-footer">
			<button type="submit" class="submit-action-btn">
				<span>제출하기</span>
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
		</div>
	</form>
{/if}

<style>
	.selection-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		margin-top: 20px;
	}

	.selection-card {
		padding: 48px 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 24px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: var(--radius-lg);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		color: inherit;
	}

	.selection-card:hover {
		border-color: var(--star-glow);
		background: rgba(254, 240, 138, 0.05);
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}

	.card-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(254, 240, 138, 0.1);
		color: var(--star-glow);
		border-radius: var(--radius-md);
		transition: all 0.3s ease;
	}

	.selection-card:hover .card-icon {
		transform: scale(1.1) rotate(-5deg);
		background: var(--star-glow);
		color: var(--sky-midnight);
	}

	.cat-name {
		font-family: 'Playfair Display', serif;
		font-size: 24px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 8px;
	}

	.cat-desc {
		font-size: 14px;
		color: var(--text-secondary);
		margin-bottom: 16px;
		line-height: 1.6;
	}

	.cat-limit {
		font-size: 13px;
		font-weight: 600;
		color: var(--star-glow);
		opacity: 0.8;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		color: var(--text-muted);
		font-size: 15px;
		cursor: pointer;
		transition: color 0.3s;
	}

	.back-btn:hover {
		color: var(--star-glow);
	}

	.active-category {
		font-size: 14px;
		font-weight: 700;
		color: var(--star-glow);
		padding: 6px 16px;
		background: rgba(254, 240, 138, 0.1);
		border-radius: 100px;
		border: 1px solid rgba(254, 240, 138, 0.2);
	}

	.submit-form {
		padding: 40px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 32px;
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
	}

	@media (max-width: 640px) {
		.selection-grid {
			grid-template-columns: 1fr;
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		font-weight: 600;
		color: var(--text-secondary);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.char-count {
		font-size: 12px;
		color: var(--text-muted);
		background: rgba(255, 255, 255, 0.05);
		padding: 2px 8px;
		border-radius: 4px;
	}

	.char-count.over {
		color: #fca5a5;
		background: rgba(239, 68, 68, 0.1);
	}

	input,
	textarea {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		padding: 14px 18px;
		font-size: 16px;
		color: white;
		outline: none;
		transition: all 0.3s;
		width: 100%;
		font-family: inherit;
	}

	input::placeholder,
	textarea::placeholder {
		color: rgba(255, 255, 255, 0.2);
	}

	input:focus,
	textarea:focus {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--star-glow);
		box-shadow: 0 0 15px rgba(254, 240, 138, 0.1);
	}

	textarea {
		resize: vertical;
		line-height: 1.8;
		min-height: 440px;
		padding: 20px;
	}

	.form-footer {
		display: flex;
		justify-content: flex-end;
		padding-top: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.submit-action-btn {
		height: 54px;
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--star-glow);
		color: var(--sky-midnight);
		border: none;
		border-radius: var(--radius-md);
		padding: 0 32px;
		font-size: 16px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.submit-action-btn:hover {
		transform: scale(1.03) rotate(-1deg);
		box-shadow: 0 0 30px rgba(254, 240, 138, 0.4);
	}

	.toast {
		position: fixed;
		bottom: 40px;
		right: 40px;
		z-index: 1000;
		animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.toast-content {
		display: flex;
		align-items: center;
		gap: 12px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		padding: 16px 24px;
		border-radius: var(--radius-md);
		color: var(--white-star);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.toast.error .toast-content {
		border-color: rgba(239, 68, 68, 0.3);
		color: #fca5a5;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%) opacity(0);
		}
		to {
			transform: translateX(0) opacity(1);
		}
	}
</style>

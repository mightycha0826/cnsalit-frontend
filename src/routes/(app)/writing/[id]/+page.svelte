<!-- UI 작업 필요 -->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import type Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import LikeButton from '$lib/components/LikeButton.svelte';

	let { data, form }: PageProps = $props();
	let quillContainer: HTMLDivElement | null = null;
	let showReviewForm = $state(false);

	let editingReviewId = $state<string | null>(null);
	let editingContent = $state('');

	const openEdit = (review: { id: string; content: string }) => {
		editingReviewId = review.id;
		editingContent = review.content;
	};

	const cancelEdit = () => {
		editingReviewId = null;
		editingContent = '';
	};

	onMount(async () => {
		if (!quillContainer) return;
		const { default: Quill } = await import('quill');
		const quill = new Quill(quillContainer, {
			readOnly: true,
			theme: 'snow',
			modules: { toolbar: false }
		});
		if (data.writing.content) {
			quill.setContents(data.writing.content);
		}
	});
</script>

<div class="writing-detail-page">
	<div class="page-inner">
		<header class="detail-header">
			<a href="/dashboard" class="back-link">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path d="M19 12H5m7 7-7-7 7-7" />
				</svg>
				<span>대시보드로 돌아가기</span>
			</a>
		</header>

		<article class="writing-card cosmic-glass">
			<div class="card-header">
				<div class="category-tag">{data.writing.type}</div>
				<h1 class="writing-title">{data.writing.title}</h1>
				<div class="author-row">
					<span class="author-name"
						>by <span class="name">{data.writing.user_name || '익명 작가'}</span></span
					>
				</div>
			</div>

			<div class="readability-backdrop">
				<div class="writing-content" bind:this={quillContainer}></div>
			</div>

			<div class="card-footer">
				<span class="date-text"
					>{new Date(data.writing.created_at)
						.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
						.replace(/-/g, '.')}</span
				>
				<div class="footer-actions">
					<LikeButton liked={data.likeMap.isLiked} count={data.likeMap.likeCount} />
				</div>
			</div>
		</article>

		<section class="reviews-section">
			<div class="section-header">
				<h2 class="section-title">감상평 <span class="count">{data.reviewCount}</span></h2>

				{#if !data.reviews.some((review) => review.user_id === data.currentUserId)}
					<button class="btn-glass sm" onclick={() => (showReviewForm = !showReviewForm)}>
						{showReviewForm ? '취소' : '감상 남기기'}
					</button>
				{/if}
			</div>

			{#if showReviewForm}
				<form class="review-compose cosmic-glass" method="POST" action="?/addReview">
					<textarea
						id="review-content"
						name="content"
						rows="4"
						required
						placeholder="작품을 읽고 느낀 감동을 작가님께 전해보세요."
					></textarea>
					<div class="form-footer">
						<button type="submit" class="btn-primary sm">등록하기</button>
					</div>
					{#if form?.reviewError}
						<p class="error-text">{form.reviewError}</p>
					{/if}
				</form>
			{/if}

			<div class="reviews-list">
				{#each data.reviews as review}
					<div class="review-card cosmic-glass" class:mine={review.user_id === data.currentUserId}>
						{#if editingReviewId === review.id}
							<form class="edit-form" method="POST" action="?/editReview">
								<input type="hidden" name="review_id" value={review.id} />
								<textarea name="content" rows="3" required bind:value={editingContent}></textarea>
								<div class="edit-actions">
									<button type="submit" class="text-btn success">저장</button>
									<button type="button" class="text-btn" onclick={cancelEdit}>취소</button>
								</div>
							</form>
						{:else}
							<div class="review-header">
								<span class="reviewer-name">{review.user_name || '익명'}</span>
								{#if review.user_id === data.currentUserId}
									<div class="reviewer-actions">
										<button class="icon-btn" onclick={() => openEdit(review)} aria-label="수정">
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
											>
												<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
											</svg>
										</button>
										<form method="POST" action="?/removeReview">
											<input type="hidden" name="review_id" value={review.id} />
											<button class="icon-btn delete" type="submit" aria-label="삭제">
												<svg
													width="14"
													height="14"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
												>
													<path
														d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
													/>
												</svg>
											</button>
										</form>
									</div>
								{/if}
							</div>
							<p class="review-content">{review.content}</p>
						{/if}
					</div>
				{:else}
					<div class="empty-reviews">
						<p>아직 남겨진 감상이 없습니다. 첫 번째 감상평을 남겨보세요.</p>
					</div>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	.writing-detail-page {
		padding: 40px 20px 100px;
	}

	.page-inner {
		max-width: 1000px;
		margin: 0 auto;
	}

	.detail-header {
		margin-bottom: 32px;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition: all 0.3s;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 100px;
	}

	.back-link:hover {
		color: var(--star-glow);
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(254, 240, 138, 0.3);
		transform: translateX(-4px);
	}

	.writing-card {
		padding: 80px 100px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		margin-bottom: 64px;
		position: relative;
	}

	.card-header {
		text-align: center;
		margin-bottom: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.category-tag {
		font-size: 12px;
		font-weight: 700;
		color: var(--star-glow);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		background: rgba(254, 240, 138, 0.08);
		padding: 8px 16px;
		border-radius: 100px;
		border: 1px solid rgba(254, 240, 138, 0.2);
		margin-bottom: 32px;
	}

	.writing-title {
		font-family: 'Playfair Display', serif;
		font-size: 64px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 32px;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}

	.author-row {
		display: flex;
		justify-content: center;
	}

	.author-name {
		font-family: 'Pretendard', sans-serif;
		font-size: 20px;
		color: var(--text-secondary);
		font-style: italic;
		letter-spacing: 0.03em;
	}

	.author-name .name {
		color: var(--text-primary);
		font-weight: 600;
		font-style: normal;
		margin-left: 6px;
	}

	.readability-backdrop {
		background: rgba(255, 255, 255, 0.02);
		padding: 60px;
		border-radius: var(--radius-md);
		border: 1px solid rgba(255, 255, 255, 0.03);
	}

	.writing-content {
		font-family:
			'Inter',
			-apple-system,
			sans-serif;
		font-size: 19px;
		line-height: 2.2;
		color: var(--text-primary);
	}

	.card-footer {
		margin-top: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 32px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.date-text {
		font-family: 'Pretendard', sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: var(--text-muted);
		opacity: 0.6;
	}

	.footer-actions {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-left: auto; /* Push to right just in case */
	}

	/* Reset Quill internal styles to match theme */
	:global(.ql-editor) {
		padding: 0 !important;
		font-size: inherit !important;
		line-height: inherit !important;
	}
	:global(.ql-container.ql-snow) {
		border: none !important;
	}

	.reviews-section {
		margin-top: 60px;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 32px;
	}

	.section-title {
		font-family: 'Playfair Display', serif;
		font-size: 24px;
		font-weight: 700;
		color: var(--white-star);
	}

	.section-title .count {
		font-size: 16px;
		color: var(--text-muted);
		margin-left: 8px;
	}

	.review-compose {
		padding: 24px;
		margin-bottom: 32px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.review-compose textarea {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-md);
		padding: 16px;
		color: white;
		font-size: 16px;
		resize: none;
		outline: none;
	}

	.review-compose textarea:focus {
		border-color: var(--star-glow);
	}

	.form-footer {
		display: flex;
		justify-content: flex-end;
	}

	.reviews-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.review-card {
		padding: 24px;
		transition: transform 0.3s;
	}

	.review-card.mine {
		border-color: rgba(254, 240, 138, 0.2);
	}

	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.reviewer-name {
		font-weight: 600;
		font-size: 15px;
		color: var(--text-primary);
	}

	.review-content {
		font-size: 15px;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.reviewer-actions {
		display: flex;
		gap: 8px;
	}

	.icon-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		padding: 4px;
		cursor: pointer;
		transition: color 0.3s;
	}

	.icon-btn:hover {
		color: var(--white-star);
	}

	.icon-btn.delete:hover {
		color: #fca5a5;
	}

	.empty-reviews {
		text-align: center;
		padding: 60px;
		color: var(--text-muted);
		background: rgba(255, 255, 255, 0.02);
		border-radius: var(--radius-md);
		border: 1px dashed rgba(255, 255, 255, 0.1);
	}

	.text-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
	}

	.text-btn.success {
		color: var(--star-glow);
	}

	.edit-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.edit-form textarea {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid var(--star-glow);
		border-radius: 8px;
		padding: 12px;
		color: white;
		font-size: 15px;
	}

	.edit-actions {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
	}

	@media (max-width: 768px) {
		.writing-card {
			padding: 32px;
		}
		.writing-title {
			font-size: 32px;
		}
		.readability-backdrop {
			padding: 24px;
		}
	}
</style>

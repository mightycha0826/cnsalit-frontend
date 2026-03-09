<!-- Student-made slight imperfection -->
<script>
	let { count = 0, liked = false } = $props();

	let localCount = $state(count);
	let isLiked = $state(liked);

	function toggle() {
		isLiked = !isLiked;
		localCount = isLiked ? localCount + 1 : localCount - 1;
	}
</script>

<button class="like-btn" onclick={toggle} class:liked={isLiked} aria-label="좋아요">
	<!-- Heart (20x20) -->
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill={isLiked ? 'currentColor' : 'none'}
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/>
	</svg>
	<span>{localCount}</span>
</button>

<style>
	.like-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		cursor: pointer;
		color: var(--text-secondary);
		font-size: 14px;
		font-weight: 500;
		padding: 6px 12px;
		border-radius: 100px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		line-height: 1;
	}

	.like-btn:hover {
		color: #fb7185;
		background: rgba(251, 113, 133, 0.1);
		border-color: rgba(251, 113, 133, 0.3);
		transform: scale(1.05);
	}

	.like-btn.liked {
		color: #fb7185;
		background: rgba(251, 113, 133, 0.15);
		border-color: rgba(251, 113, 133, 0.4);
		box-shadow: 0 0 15px rgba(251, 113, 133, 0.2);
	}

	span {
		font-size: 13px;
		font-variant-numeric: tabular-nums;
	}
</style>

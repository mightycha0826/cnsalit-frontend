<!-- Student-made slight imperfection -->
<script>
	let { variant = 'primary', href = null, onclick = null, disabled = false, children } = $props();
</script>

{#if href}
	<a {href} class="btn btn-{variant}" class:disabled>
		{@render children()}
	</a>
{:else}
	<button class="btn btn-{variant}" {onclick} {disabled}>
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		cursor: pointer;
		font-family:
			'Pretendard',
			-apple-system,
			sans-serif;
		font-size: 16px;
		font-weight: 500;
		text-decoration: none;
		border: none;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		line-height: 1;
	}

	.btn-primary {
		background: var(--star-glow);
		color: var(--sky-midnight);
		border-radius: 100px;
		padding: 14px 28px;
		font-weight: 700;
		box-shadow: 0 0 15px rgba(254, 240, 138, 0.3);
	}

	.btn-primary:hover {
		transform: scale(1.02);
		box-shadow: 0 0 25px rgba(254, 240, 138, 0.5);
	}

	.btn-glass {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 100px;
		padding: 13px 26px;
		color: var(--white-star);
	}

	.btn-glass:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-1px);
	}

	.disabled {
		opacity: 0.3;
		pointer-events: none;
		filter: grayscale(1);
	}
</style>

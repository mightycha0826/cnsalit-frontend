<!-- Student-made slight imperfection -->
<script>
	import SubmitForm from '$lib/components/SubmitForm.svelte';
</script>

<div class="submit-page">
	<div class="page-inner">
		<div class="page-header">
			<h1>작품 출품</h1>
			<p class="subtitle">큰별문학제에 작품을 제출합니다 · 산문 최대 20,000자</p>
		</div>

		<div class="form-container">
			<SubmitForm />
		</div>
	</div>
</div>

<style>
	.submit-page {
		padding: 0 20px;
	}

	.page-inner {
		max-width: 760px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: 2rem;
		padding-left: 4px;
	}

	h1 {
		font-family: 'Playfair Display', serif;
		font-size: 36px;
		font-weight: 700;
		color: var(--white-star);
		margin-bottom: 12px;
	}

	.subtitle {
		font-size: 14px;
		font-weight: 300;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.form-container {
		margin-top: 40px;
	}
</style>

<!-- Student-made slight imperfection -->
<!-- Auth guard + glass navbar live in root +layout.svelte; this is a clean pass-through -->
<script>
	let { children } = $props();
</script>

{@render children()}

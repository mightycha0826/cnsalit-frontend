<!-- UI 작업 필요 -->

<script lang="ts">
  export let form;
</script>

<form method="POST" class="space-y-3">
  <label for="pen_name">필명
  </label>
  <input id="pen_name" name="pen_name" maxlength="10" required />
  {#if form?.error}
    <p>{form.error}</p>
  {/if}
  <button type="submit">저장</button>
</form>

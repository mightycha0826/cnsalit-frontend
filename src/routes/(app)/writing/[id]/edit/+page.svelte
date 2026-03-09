<!-- UI 작업 필요 -->

<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageProps } from './$types';
  import type Quill from 'quill';
  import type Clipboard from 'quill/modules/clipboard';
  import Delta from 'quill-delta';
  import 'quill/dist/quill.snow.css';

  let { data, form }: PageProps = $props();

  let quillContainer: HTMLDivElement | null = null;
  let contentInput: HTMLInputElement | null = null;
  let quill: Quill | null = null;

  let title = $state('');
  let type = $state('poem');

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['clean'],
  ];

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'align',
  ];

  const syncContent = () => {
    if (!quill || !contentInput) return;
    contentInput.value = JSON.stringify(quill.getContents());
  };

  const stripEmbeds = (clipboard: Clipboard) => {
    clipboard.addMatcher(Node.ELEMENT_NODE, (_node, delta) => {
      const filteredOps = delta.ops.filter((op) => typeof op.insert === 'string');
      return new Delta(filteredOps);
    });
  };

  onMount(async () => {
    if (!quillContainer) return;
    title = data.writing.title ?? '';
    type = data.writing.type ?? 'poem';
    const { default: Quill } = await import('quill');
    quill = new Quill(quillContainer, {
      theme: 'snow',
      placeholder: '글을 입력하세요.',
      modules: { toolbar: toolbarOptions },
      formats,
    });

    const clipboard = quill.getModule('clipboard') as Clipboard;
    stripEmbeds(clipboard);

    if (data.writing.content) {
      quill.setContents(data.writing.content);
    }

    quill.on('text-change', syncContent);
    syncContent();
  });
</script>

<form method="POST" onsubmit={syncContent}>
  <label for="title">제목</label>
  <input id="title" name="title" type="text" maxlength="30" required bind:value={title} />

  <fieldset>
    <legend>유형</legend>
    <label>
      <input type="radio" name="type" value="poem" bind:group={type} required />
      운문
    </label>
    <label>
      <input type="radio" name="type" value="prose" bind:group={type} required />
      산문
    </label>
  </fieldset>

  <div bind:this={quillContainer}></div>
  <input type="hidden" name="content" bind:this={contentInput} />

  {#if form?.error}
    <p>{form.error}</p>
  {/if}

  <button type="submit">수정</button>
</form>

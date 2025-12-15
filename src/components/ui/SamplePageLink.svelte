{#if urlObj !== false}
  <a href="{urlObj.href}" class="link-to-sample button button-small button-secondary" target="_blank" title="view page">
    <span class="visuallyhidden">view page</span>
    <svg aria-hidden="true" class="icon-external-link">
      <use xlink:href="#icon-external-link"></use>
    </svg>
  </a>
{/if}

<style>
  .link-to-sample {
    border-width: 1px;
    font-weight: normal;
    border-color: var(--line-grey);
    vertical-align: middle;
    margin: 2px 0;
  }
</style>

<script>
  import { basepath } from '@app/stores/appStore.js';
  import { replaceHost } from '@app/stores/hostReplacementStore.js';
  
  export let href;
  
  let urlObj;
  
  $: {
    try {
      urlObj = replaceHost(new URL(href));
    } catch (err) {
      console.error(err);
      urlObj = false;
    }
  }
</script>
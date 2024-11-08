<a href="{href}" class="link-to-sample button button-small button-secondary" target="_blank" title="view page">
  <span class="visuallyhidden">view page</span>
  <svg aria-hidden="true" class="icon-info">
    <use xlink:href={`${$basepath}/images/icons.svg#icon-external-link`}></use>
  </svg>
</a>

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
  export let href;
</script>
<svg aria-hidden="true" class="icon-{icon}">
  {#if alt}<span class="visuallyhidden">{alt}</span>{/if}
  <use xlink:href={`${$basepath}/images/icons.svg#icon-${icon}`}></use>
</svg>

<script>
  import { basepath } from '@app/stores/appStore.js';
  
  export let icon = 'default';
  export let alt;
</script>
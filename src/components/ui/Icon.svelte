<svg aria-hidden="true" class="icon-{icon}">
  {#if alt}<span class="visuallyhidden">{alt}</span>{/if}
  <use xlink:href={`#icon-${icon}`}></use>
</svg>

<script>
  export let icon = 'default';
  export let alt;
</script>
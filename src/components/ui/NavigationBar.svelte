<!--
 * @component
 *   NavigationBar
 *  -->
<nav class="Nav default-grid">
  <ol class="Nav__Itemcontainer">
    {#each navigationItems as navigationItem}
      <li
        class="nav__item"
        class:current="{navigationItem.path === currentPath}"
      >
        <Link to="{navigationItem.path}">{navigationItem.title}</Link>
      </li>
    {/each}
  </ol>
</nav>
<!-- /component -->

<style>
  .Nav {
    background-color: #d0e1f1;
    background-color: var(--cloudy-subtle);
  }

  .Nav__Itemcontainer {
    grid-column: 2 / 10;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow-x: auto;
  }

  .nav__item.current {
    background-color: #fff;
  }

  @media (min-width: 40.1em) {
    .Nav__Itemcontainer {
      flex-direction: row;
    }
  }
</style>

<script>
  import { getContext } from 'svelte';
  import { Link, useLocation } from 'svelte-navigator';
  import { routes } from '@app/stores/appStore.js';

  const { translate, ALLOW_EDIT } = getContext('app');
  
  $: navigationItems = Object.values($routes)
    .filter(r => !r.hideFromNav && r.editMode.includes(ALLOW_EDIT))
    .map(r => ({
      path: r.path,
      title: $translate(`UI.NAV.WIZARD.${r.titleKey}`)
    }));

  const location = useLocation();

  $: currentPath = $location.pathname;
</script>

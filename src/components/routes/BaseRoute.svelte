<!-- @Route:/ -->
<Router basepath="{basepath}">
  <BaseLayout>
    <!-- Components are Pages or nested Routes -->
    <Route path="/">
      {#if ALLOW_EDIT}
        <OverviewPage />
      {:else}
        <OpenReportPage />
      {/if}
    </Route>
    <Route path="/evaluation/*"><EvaluationRoute /></Route>

    <!-- If anything else, it should hit an error? -->
    <Route path="/*">
      {#if ALLOW_EDIT}
        <OverviewPage />
      {:else}
        <OpenReportPage />
      {/if}
    </Route>
    <Route path="/acknowledgements"><Acknowledgements /></Route>
  </BaseLayout>
</Router>
<!-- /@Route -->

<script>
  import { getContext } from "svelte";
  import { Router, Route } from 'svelte-navigator';

  import BaseLayout from '@app/components/layouts/BaseLayout.svelte';
  import EvaluationRoute from './EvaluationRoute.svelte';

  // Import pages
  import OverviewPage from '@app/components/pages/OverviewPage.svelte';
  import OpenReportPage from "@app/components/pages/OpenReportPage.svelte";
  import Acknowledgements from '../pages/Acknowledgements.svelte';

  export let basepath;

  const { ALLOW_EDIT } = getContext('app');
</script>

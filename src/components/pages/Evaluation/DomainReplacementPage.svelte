<Page title="{TRANSLATED.PAGE_TITLE}" pageid="domain-replacement">
  <p>{@html TRANSLATED.INTRO}</p>
  
  <HostReplacements />
</Page>

<script>
  import { getContext } from "svelte";
  import Page from "@app/components/ui/Page.svelte";
  import HostReplacements from "@app/components/ui/HostReplacements.svelte";

  const { translate } = getContext('app');
  
  $: TRANSLATED = {
    PAGE_TITLE: $translate('PAGES.DOMAIN_REPLACEMENT.TITLE'),
    INTRO: $translate('PAGES.DOMAIN_REPLACEMENT.INTRO'),
  };
</script>
<Page title="{TRANSLATED.PAGE_TITLE}" pageid="open-report">
  <div class="getting-started">
    <p class="getting-started__intro">
      {@html TRANSLATED.INTRODUCTION_P1}
    </p>

    <div class="getting-started__buttons">
      <a href="https://www.w3.org/WAI/eval/report-tool/evaluation/define-scope" class="button button-secondary Button Button--secondary" target="_blank" style="gap: .5em;">
        {TRANSLATED.BUTTON_NEW_EVALUATION}
        <span class="visuallyhidden">opens externally</span>
        <svg aria-hidden="true" class="icon-external-link">
          <use xlink:href={`${$basepath}/images/icons.svg#icon-external-link`}></use>
        </svg>
      </a>
      
      <OpenEvaluation buttonStyle="primary" navigateToAfterOpen="/evaluation/domain-replacement" />
    </div>
  </div>
  
  <p>{@html TRANSLATED.INTRODUCTION_P2}</p>

</Page>
<!-- /component -->

<script>
  import { getContext } from 'svelte';

  import Page from '@app/components/ui/Page.svelte';
  import OpenEvaluation from '@app/components/form/OpenEvaluation.svelte';
  import { basepath } from '@app/stores/appStore.js';

  const { translate } = getContext('app');

  $: TRANSLATED = {
    BUTTON_NEW_EVALUATION: $translate('UI.NAV.MENU_NEW', {
      default: 'New report'
    }),
    PAGE_TITLE: $translate('PAGES.START.OPEN.SUBTITLE'),
    INTRODUCTION_P1: $translate('PAGES.START.INTRO_1'),
    INTRODUCTION_P2: $translate('PAGES.START.OPEN.INTRO_2'),
  };

</script>

<style>
  .getting-started__intro {
    font-size: 130%;
    max-width: 42em;
    margin: 0;
  }
  .getting-started__buttons {
    text-align: center;
    padding: 1em;
  }
  :global(.getting-started__buttons .Button),
  :global(.getting-started__buttons .File) {
    margin: .25em;
  }
  :global(.getting-started + .excol-all) {
    margin: 3em 0 -1em 0;
  }
  @media (min-width: 45em) {
    .getting-started {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2em;
    }
    .getting-started__buttons {
      padding: 0;
      align-self: center;
    }
  }
</style>
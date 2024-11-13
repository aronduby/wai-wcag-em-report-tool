<Page title="{TRANSLATED.PAGE_TITLE}" pageid="open-report">
  {#if $assertions.length}
    <aside class="Panel your-report--expanded">
      <h2 class="Panel__Header__heading your-report__heading">
        <span class="your-report__heading-pre">{TRANSLATED.CURRENT_REPORT_SUBTITLE}</span>
        {siteName}
      </h2>
      
      <div class="your-report__content">
        <p>{TRANSLATED.CURRENT_REPORT_INTRODUCTION}</p>
        <div>
          <Link to="{$routes.DOMAIN_REPLACEMENT.path}" class="button button-secondary Button Button--secondary">{$translate(`UI.NAV.WIZARD.${$routes.DOMAIN_REPLACEMENT.titleKey}`)}</Link>
          <Link to="{$routes.VIEW_REPORT.path}" class="button button-primary Button Button--primary">{$translate(`UI.NAV.WIZARD.${$routes.VIEW_REPORT.titleKey}`)}</Link>
        </div>
      </div>
    </aside>
  {/if}
  
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
  import { Link } from 'svelte-navigator';
  import Page from '@app/components/ui/Page.svelte';
  import OpenEvaluation from '@app/components/form/OpenEvaluation.svelte';
  import { basepath, routes } from '@app/stores/appStore.js';
  import summaryStore from '@app/stores/summaryStore.js';
  import assertions from '@app/stores/earl/assertionStore/index.js';

  const { translate, scopeStore } = getContext('app');

  $: TRANSLATED = {
    YOUR_REPORT: $translate('UI.COMMON.YOUR_REPORT'),
    NEXT: $translate('UI.COMMON.NEXT', {
      default: 'Next {label}',
      values: { label: 'step' }
    }),
    BUTTON_NEW_EVALUATION: $translate('UI.NAV.MENU_NEW', {
      default: 'New report'
    }),
    PAGE_TITLE: $translate('PAGES.START.OPEN.SUBTITLE'),
    INTRODUCTION_P1: $translate('PAGES.START.INTRO_1'),
    INTRODUCTION_P2: $translate('PAGES.START.OPEN.INTRO_2'),
    CURRENT_REPORT_SUBTITLE: $translate('PAGES.START.OPEN.CURRENT_REPORT.SUBTITLE'),
    CURRENT_REPORT_INTRODUCTION: $translate('PAGES.START.OPEN.CURRENT_REPORT.INTRO'),
  };

  $: siteName = $summaryStore['EVALUATION_TITLE'] || $scopeStore['SITE_NAME'] || TRANSLATED.YOUR_REPORT;

</script>

<style>
  .your-report--expanded {
    margin-top: -1em;
    padding-bottom: 0;
    margin-bottom: 2em;
  }
  h2.your-report__heading {
    flex-direction: column;
    align-items: flex-start;
  }
  .your-report__heading-pre {
    font-size: .8em;
  }
  .your-report__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .9em;
    padding: 1em 0;
  }
  .your-report__content p {
    margin: 0;
  }
  
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
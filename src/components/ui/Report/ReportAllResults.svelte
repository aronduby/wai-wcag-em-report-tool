{#each principles as principle}
  <h4>{principle} {TRANSLATED.PRINCIPLES[principle].TITLE}</h4>

  {#each guidelines.filter((g) => g.indexOf(principle) === 0) as guideline}
    <h5 
      id={`guideline-${guideline.replace('.', '')}`}
      class="pageJump-holder"
    >
      {guideline} {TRANSLATED.GUIDELINES[guideline].TITLE}
      <a class="pageJump" href="#{`guideline-${guideline.replace('.', '')}`}"><Icon icon="link" alt="jump to guideline" /></a>
    </h5>
    <table class="Auditor__ResultsTable" aria-labelledby={`guideline-${guideline.replace('.', '')}`}>
      <tbody>
          <tr class="Auditor__ResultsTableHeader">
            <th scope="col">{TRANSLATED.HEADER_SUCCESS_CRITERION}</th>
            <th scope="col">{TRANSLATED.HEADER_RESULT}</th>
            <th scope="col">{TRANSLATED.HEADER_OBSERVATIONS}</th>
            {#if ALLOW_EDIT}<th scope="col" class="strip">{TRANSLATED.EDIT}</th>{/if}
          </tr>
        <!--
        * Should filter assertions based on test prop;
        * assertion.test.num in case of wcag.
        * Specificly test.num.indexOf guideline === 0
        * because we are grouping per principle > guideline.
        * -->
        {#each guidelineCriteria(guideline) as criterion (criterion.num)}
          <tr class="Auditor__Assertion">
            <th scope="row" class="Auditor__Assertion-SC" id={`criterion-${criterion.num.replaceAll('.', '')}`}>
              <span class="pageJump-holder">
                {criterion.num}: {TRANSLATED.CRITERIA[criterion.num].TITLE}
                <a class="pageJump" href="#{`criterion-${criterion.num.replaceAll('.', '')}`}"><Icon icon="link" alt="jump to criterion" /></a>
              </span>
              
              <ul class="criterion__resource-links">
                {#if wcagVersion == '20'}
                  <li>
                    <ResourceLink
                      href="https://www.w3.org/TR/UNDERSTANDING-WCAG{wcagVersion}/{criterion.id}.html"
                    >
                      {TRANSLATED.UNDERSTAND_BUTTON}
                      {criterion.num}
                    </ResourceLink>
                  </li>
                {:else}
                  <li>
                    <ResourceLink
                      href="https://www.w3.org/WAI/WCAG{wcagVersion}/Understanding/{criterion.id}.html"
                    >
                      {TRANSLATED.UNDERSTAND_BUTTON}
                      {criterion.num}
                    </ResourceLink>
                  </li>
                {/if}
                  <li>
                    <ResourceLink href="https://www.w3.org/WAI/WCAG{wcagVersion}/quickref/#{criterion.id}">
                      {TRANSLATED.HOW_TO_BUTTON}
                      {criterion.num}
                    </ResourceLink>
                  </li>
              </ul>
              
            </th>
            <td>
                {#each scopeAssertion(criterion) as assertion}
                  {#if sampleAssertions(criterion).length}
                  <h6>{TRANSLATED.HEADING_SCOPE_RESULTS}</h6>
                  {/if}
                  <p>        
                    <span class="results-label-mobile">{TRANSLATED.HEADER_RESULT}:</span>
                    {assertion.result.outcome.title || TRANSLATED.TEXT_NOT_CHECKED}</p>
                {:else}
                  <p>
                    <span class="results-label-mobile">{TRANSLATED.HEADER_RESULT}:</span>
                    {TRANSLATED.TEXT_NOT_CHECKED}
                  </p>
                {/each}
                {#if sampleAssertions(criterion).length}
                  {#each sampleAssertions(criterion) as assertion}
                    {#if assertionHasContents(assertion)}
                    <h6>
                      {assertion.subject.title || `Sample ${assertion.subject.ID}`}
                      {#if assertion.subject.description}
                        <SamplePageLink href="{assertion.subject.description}" />
                      {/if}
                    </h6>
                    <p>
                      <span class="results-label-mobile">{TRANSLATED.HEADER_RESULT}:</span>
                      {assertion.result.outcome.title || TRANSLATED.TEXT_NOT_CHECKED}
                    </p>
                    {/if}
                  {/each}
                {/if}
            </td>
            <td>
              {#each scopeAssertion(criterion) as assertion}
                {#if assertion.result.description}
                  {#if sampleAssertions(criterion).length}
                  <h6>{TRANSLATED.HEADING_SCOPE_RESULTS}</h6>
                  {/if}
                  <p class="results-label-mobile">{TRANSLATED.LABEL_OBSERVATION}:</p>
                  {@html marked(assertion.result.description, {"sanitize": true})}
                {/if}
              {/each}
              {#if sampleAssertions(criterion).length}
                {#each sampleAssertions(criterion) as assertion}
                  {#if assertionHasContents(assertion)}
                    <h6>
                      {assertion.subject.title || `Sample ${assertion.subject.ID}`}
                      {#if assertion.subject.description}
                        <SamplePageLink href="{assertion.subject.description}" />
                      {/if}
                    </h6>
                    {#if assertion.result.description}
                      {@html marked(assertion.result.description, {"sanitize": true})}
                    {:else}
                      <p>{TRANSLATED.NO_OBSERVATIONS_FOUND}</p>
                    {/if}
                  {/if}
                {/each}
              {/if}
            </td>
            {#if ALLOW_EDIT}
              <td class="strip">
                <Link to={`/evaluation/audit-sample#criterion-${criterion.num.replaceAll('.','')}`}>
                  <span class="visuallyhidden">Edit {criterion.num}</span>
                  <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-edit">
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>        
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  {/each}
{/each}

<style>
  .Auditor__ResultsTable {
    width: 100%;
  }
  h5 {
    color: var(--wai-green);
    margin: 1.5em 0 1em;
  }
  .Auditor__ResultsTable th {
    width: 30%;
    position: absolute;
    left: -9999em;
    top: -9999em;
  }
  .Auditor__ResultsTable th:nth-child(2) {
    width: 25%;
  }
  .Auditor__ResultsTable th:nth-child(3) {
    width: 60%;
  }
  .Auditor__ResultsTableHeader {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .Auditor__Assertion {
    margin-bottom: 1em;
    border-bottom: 1px solid var(--cloudy);
  }
  .Auditor__Assertion-SC {
    font-weight: bold;
    color: inherit;
    background-color: inherit;
  }
  .Auditor__ResultsTable td {
    display: block;
    position: relative;
    border-style: none;
  }
  @media (min-width: 60em) {
    .Auditor__Assertion {
      border-bottom: 0;
    }
    .Auditor__Assertion-SC {
      font-weight: normal;
    }
    .Auditor__ResultsTable td {
      display: table-cell;
      border: 1px solid var(--cloudy);
    }
    .Auditor__ResultsTable th {
      position: static;
    }
    .results-label-mobile {
      display: none;
    }
  }
  
  ul.criterion__resource-links {
    margin: .5em;
    padding: 0;
    list-style: none;
  }

  ul.criterion__resource-links li {
    padding: 0;
    margin-bottom: .2em;
  }
  
  .pageJump-holder .pageJump :global(svg) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }
  
  .pageJump-holder:hover .pageJump :global(svg),
  .pageJump-holder:focus-within .pageJump :global(svg) {
    clip-path: unset;
  }
</style>

<script>
  import { getContext } from 'svelte';
  import { Link } from 'svelte-navigator';
  import marked from 'marked';

  import { WCAG_VERSIONS } from '@app/stores/wcagStore.js';
  import scopeStore from '@app/stores/scopeStore.js';
  import assertions from '@app/stores/earl/assertionStore/index.js';
  import subjects, {
    TestSubjectTypes
  } from '@app/stores/earl/subjectStore/index.js';
  import { TestSubject } from '@app/stores/earl/subjectStore/models.js';
  import ResourceLink from '@app/components/ui/ResourceLink.svelte';
  import SamplePageLink from "@app/components/ui/SamplePageLink.svelte";
  import { basepath } from '@app/stores/appStore.js';
  import Icon from "../Icon.svelte";

  export let criteria = [];

  const { translate, translateToObject, ALLOW_EDIT } = getContext('app');
  
  // marked.setOptions({
  //   sanitize: true
  // });

  $: TRANSLATED = {
    PRINCIPLES: $translateToObject('WCAG.PRINCIPLE'),
    GUIDELINES: $translateToObject('WCAG.GUIDELINE'),
    CRITERIA: $translateToObject('WCAG.SUCCESS_CRITERION'),
    LABEL_OUTCOME: $translate('PAGES.AUDIT.LABEL_OUTCOME'),
    LABEL_OBSERVATION: $translate('PAGES.AUDIT.ASSERTION_RESULT_DESCRIPTION_LABEL'),
    HEADING_SCOPE_RESULTS: $translate('PAGES.AUDIT.SAMPLE_FINDINGS'),
    HEADING_RESULTS_FOR: $translate('PAGES.AUDIT.RESULTS_FOR'),
    TEXT_NOT_CHECKED: $translate('UI.EARL.UNTESTED'),
    HEADER_SUCCESS_CRITERION: $translate('PAGES.REPORT.HEADER_SUCCESS_CRITERION'),
    HEADER_RESULT: $translate('PAGES.REPORT.HEADER_RESULT'),
    HEADER_OBSERVATIONS: $translate('PAGES.REPORT.HEADER_OBSERVATIONS'),
    NO_OBSERVATIONS_FOUND: $translate('PAGES.REPORT.NO_OBSERVATIONS_FOUND'),
    EDIT: $translate('UI.REPORT.EDIT'),
    UNDERSTAND_BUTTON: $translate('PAGES.AUDIT.UNDERSTAND'),
    HOW_TO_BUTTON: $translate('PAGES.AUDIT.HOW_TO'),
  };

  // Sets are unique values
  $: principles = [...new Set(criteria.map((a) => a.num.split('.')[0]))];
  $: guidelines = [
    ...new Set(
      criteria.map((a) => {
        const splittedNum = a.num.split('.');

        return `${splittedNum[0]}.${splittedNum[1]}`;
      })
    )
  ];

  $: wcagVersion = $scopeStore['WCAG_VERSION'].replace(".", "");

  function guidelineCriteria(guideline) {
    return filterAssertions().filter(
      (criterion) => criterion.num.indexOf(guideline) === 0
    );
  }

  function criterionAssertions(criterion) {
    return $assertions.filter((assertion) => {
      return assertion.test.num === criterion.num;
    });
  }

  function filterAssertions(){
    return criteria.filter((criterion) => {
      const filterVersions = WCAG_VERSIONS;

      // Pass filtering if not enabled
      if (filterVersions.length === 0) {
        return true;
      }

      return filterVersions.indexOf(criterion.version) >= 0;
    })
    // Filter by conformance level
    .filter((criterion) => {
      const filterLevels = $scopeStore['CONFORMANCE_TARGET'];

      // Pass filtering if not enabled
      if (filterLevels.length === 0) {
        return true;
      }
      return filterLevels.indexOf(criterion.conformanceLevel) >= 0;
      });
  }

  function scopeAssertion(criterion) {
    return criterionAssertions(criterion).filter((assertion) => {
      return assertion.subject.type.indexOf(TestSubjectTypes.WEBSITE) >= 0;
    });
  }

  function sampleAssertions(criterion) {
    let sampleAssertions = criterionAssertions(criterion).filter((assertion) => {
      return assertion.subject.type.indexOf(TestSubjectTypes.WEBPAGE) >= 0;
    });
    sampleAssertions.sort(sortSubjectOrder);
    return sampleAssertions;
  }

  function sortSubjectOrder(a, b) {
    let sortingArray = [];
    $subjects.forEach((subject) => {
      sortingArray.push(subject.title)
    });
    return sortingArray.indexOf(a.subject.title) - sortingArray.indexOf(b.subject.title);
  }

  function assertionHasContents(assertion) {
    return (assertion.result.outcome.title && assertion.result.outcome.title !== TRANSLATED.TEXT_NOT_CHECKED) || assertion.result.description
  }
</script>

<!-- Sample origins that already exist -->
<div>
  <fieldset>
    <legend>{TRANSLATED.EXISTING}</legend>
    <p class="mt-0">{@html TRANSLATED.EXISTING_INTRO}</p>

    {#if sampleOrigins.length > 0}
      <div class="fields">
        {#each sampleOrigins as origin}
          <button 
            class="button button-secondary button-small" 
            disabled="{replacementOriginals.includes(origin)}"
            on:click={() => addReplacementForOriginal(origin)}
          >{origin}</button>
        {/each}
      </div>
    {:else}
      <p><em>{@html TRANSLATED.EXISTING_EMPTY}</em></p>
    {/if}
  </fieldset>
</div>

<!-- Form to add new replacements -->
<div>
  <fieldset class="mb-0">
    <legend>{TRANSLATED.REPLACEMENTS}</legend>

    <div class="fields">
      <Input className="mb-0" id="originalHost" label="{TRANSLATED.ORIGINAL_ORIGIN}" bind:value="{originalOrigin}" bind:this={originalInput} />
      <Input className="mb-0" id="replacementHost" label="{TRANSLATED.REPLACEMENT_ORIGIN}" bind:value="{replacementOrigin}" bind:this={replacementInput} />

      <button class="button button-primary" on:click={addNew} disabled="{!originalOrigin || !replacementOrigin }">{TRANSLATED.ADD_REPLACEMENT}</button>
    </div>
  </fieldset>
</div>

<!-- List of replacements -->
<ul>
  {#each $hostReplacements as [original, replacement], index}
    <li>
      <span>{original} → {replacement}</span>
      
      <button
        type="button"
        class="Editable__Control--delete"
        on:click="{() => remove(index)}"
      >
        <svg
          focusable="false"
          aria-hidden="true"
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17" stroke="#ffffff"/>
          <line x1="14" y1="11" x2="14" y2="17" stroke="#ffffff" />
        </svg>
        <span class="visually-hidden">{TRANSLATED.DELETE}</span>
      </button>
    </li>
  {/each}
</ul>

<style>
  :global(.mt-0) {
    margin-top: 0 !important;
  }
  
  :global(.mb-0) {
    margin-bottom: 0 !important;
  }
  
  .button[disabled] {
    color: var(--grey);
    border-color: var(--dark-grey);
    pointer-events: none;
  }
  
  .fields {
    display: flex;
    gap: 1em;
    align-items: flex-end;    
  }
  
  .fields :global(> div) {
    flex-basis: 30%;
  }
  
  li {
    max-width: none;
  }

  .Editable__Control--delete {
    font-size: 1em;
    margin-left: .5em;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: currentColor;
    width: 1em;
    display: inline-block;
    line-height: 1em;
    vertical-align: middle;
  }
</style>

<script>
  import Input from "../form/Input.svelte";
  import { getContext } from "svelte";
  import { hostReplacements, addReplacement, removeReplacement } from '@app/stores/hostReplacementStore.js';
  import { TestSubjectTypes } from "@app/stores/earl/subjectStore/index.js";

  const { translate, sampleStore } = getContext('app');
  
  $: sampleOrigins = [...new Set(
    [...$sampleStore['STRUCTURED_SAMPLE'], ...$sampleStore['RANDOM_SAMPLE']]
      .filter(sample => sample.type.includes(TestSubjectTypes.WEBPAGE))
      .map(sample => (new URL(sample.description)).origin)
  )];
  // $: sampleOrigins = ['http://aron.energycodeace.devdrawer.com', 'http://shane.energycodeace.devdrawer.com'];
  
  $: replacementOriginals = $hostReplacements.map(tuple => tuple[0]);
  
  let originalOrigin = '';
  let replacementOrigin = '';
  
  // reference to the inputs so we can focus
  let originalInput;
  let replacementInput;
  function addReplacementForOriginal(origin) {
    originalOrigin = origin;
    replacementOrigin = origin;
    replacementInput.focus();
  }

  // Function to add a new replacement
  function addNew() {
    if (originalOrigin && replacementOrigin) {
      try {
        new URL(originalOrigin);
      } catch (err) {
        alert (TRANSLATED.ERRORS.ORIGINAL_ORIGIN_UNPARSEABLE);
        originalInput.focus();
        return;
      }
      try {
        new URL(replacementOrigin);
      } catch (err) {
        alert (TRANSLATED.ERRORS.REPLACEMENT_ORIGIN_UNPARSEABLE);
        replacementInput.focus();
        return;
      }
      
      addReplacement(originalOrigin, replacementOrigin);
      
      originalOrigin = '';
      replacementOrigin = '';
    }
  }

  // Function to remove a replacement by index
  function remove(index) {
    removeReplacement(index);
  }

  $: TRANSLATED = {
    DELETE: $translate('UI.COMMON.DELETE'),
    EXISTING: $translate('PAGES.DOMAIN_REPLACEMENT.EXISTING'),
    EXISTING_INTRO: $translate('PAGES.DOMAIN_REPLACEMENT.EXISTING_INTRO'),
    EXISTING_EMPTY: $translate('PAGES.DOMAIN_REPLACEMENT.EXISTING_EMPTY'),
    REPLACEMENTS: $translate('PAGES.DOMAIN_REPLACEMENT.REPLACEMENTS'),
    ORIGINAL_ORIGIN: $translate('PAGES.DOMAIN_REPLACEMENT.ORIGINAL_ORIGIN'),
    REPLACEMENT_ORIGIN: $translate('PAGES.DOMAIN_REPLACEMENT.REPLACEMENT_ORIGIN'),
    ADD_REPLACEMENT: $translate('PAGES.DOMAIN_REPLACEMENT.ADD_REPLACEMENT'),
    ERRORS: {
      ORIGINAL_ORIGIN_UNPARSEABLE: $translate('PAGES.DOMAIN_REPLACEMENT.ERRORS.ORIGINAL_ORIGIN_UNPARSEABLE'),
      REPLACEMENT_ORIGIN_UNPARSEABLE: $translate('PAGES.DOMAIN_REPLACEMENT.ERRORS.REPLACEMENT_ORIGIN_UNPARSEABLE')
    }
  };
</script>

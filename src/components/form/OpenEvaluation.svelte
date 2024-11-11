<File
  id="evaluation_open"
  label="{TRANSLATED.BUTTON}"
  buttonStyle="{buttonStyle}"
  on:change="{handleOpenChange}"
/>

<script>
  import { getContext } from 'svelte';
  import { useNavigate } from 'svelte-navigator';
  import evaluationStore from '@app/stores/evaluationStore.js';
  import { interacted, interactedOpenEvaluation } from '@app/stores/interactedStore.js';
  import File, { readFile } from './File.svelte';

  export let buttonStyle = 'secondary';
  export let navigateToAfterOpen = '/evaluation/define-scope';
  
  const { translate } = getContext('app');

  $: TRANSLATED = {
    BUTTON: $translate('UI.NAV.MENU_OPEN', {default: 'Open evaluation'}),
    CLEAR_WARNING: $translate('UI.NAV.CLEAR_WARNING'),
  };

  let loading = false;
  const navigate = useNavigate();

  function handleOpenChange(event) {
    var clearResult = true;
    if($interacted == true){
      var clearResult = window.confirm(TRANSLATED.CLEAR_WARNING);
    }

    if(clearResult){
      loading = true;

      const { target } = event;
      const file = target.files[0];

      readFile(file, (result) => {
        const json = JSON.parse(result);

        $evaluationStore
          .open(json)
          .then(() => {
            $interactedOpenEvaluation = true;
            navigate(navigateToAfterOpen);
            $interacted = true;
          })
          .finally(() => {
            target.value = '';
            loading = false;
          });
      });
    }else{
      event.target.value = ''
    }
  }
</script>

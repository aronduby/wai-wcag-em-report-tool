import { internationalize } from '@app/scripts/i18n.js';

import languages from '@app/locales/index.json';
import App from '@app/components/App.svelte';
import reportData from '@app/report-data/__REPORT__.json';

const locales = languages.map((language) => language.lang);

internationalize(locales).then(() => {
  const target = document.getElementById('wai-wcag-em-report-tool');
  target.innerHTML = '';
  new App({
    target,
    props: {
      // Replaced string, see rollup.config.json replace plugin.
      basepath: '__BASEPATH__',
      reportData: reportData,
    }
  });
});

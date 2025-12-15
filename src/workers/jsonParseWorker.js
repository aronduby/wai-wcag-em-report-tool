import evaluationStore from '@app/stores/evaluationStore.js';

self.addEventListener('message', e => {
  console.log('jsonParseWorker: got message', e);

  const data = JSON.parse(e.data);
  $evaluationStore.open(data);
})
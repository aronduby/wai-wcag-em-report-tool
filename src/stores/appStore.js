import { derived, writable } from 'svelte/store';
import { t as translate } from 'svelte-i18n';

export const routes = derived([translate], ([$translate]) => {
  return {
    OVERVIEW: {
      path: '/',
      titleKey: 'START',
      editMode: [true],
    },
    OPEN_REPORT: {
      path: '/',
      titleKey: 'OPEN_REPORT',
      editMode: [false]
    },
    SCOPE: {
      path: '/evaluation/define-scope',
      titleKey: 'SCOPE',
      editMode: [true],
    },
    EXPLORE: {
      path: '/evaluation/explore-website',
      titleKey: 'EXPLORE',
      editMode: [true],
    },
    SAMPLE: {
      path: '/evaluation/select-sample',
      titleKey: 'SAMPLE',
      editMode: [true],
    },
    AUDIT: {
      path: '/evaluation/audit-sample',
      titleKey: 'AUDIT',
      editMode: [true],
    },
    SUMMARY: {
      path: '/evaluation/report-findings',
      titleKey: 'REPORT',
      editMode: [true],
    },
    DOMAIN_REPLACEMENT: {
      path: '/evaluation/domain-replacement',
      titleKey: 'DOMAIN_REPLACEMENT',
      editMode: [true, false],
    },
    VIEW_REPORT: {
      path: '/evaluation/view-report',
      titleKey: 'VIEW_REPORT',
      editMode: [true, false],
    },
    ACKNOWLEDGEMENTS: {
      path: "/acknowledgements",
      titleKey: 'ACKNOWLEDGEMENTS',
      editMode: [true, false],
      hideFromNav: true,
    }
  };
});

export const previousVersionMsgDismissed = writable(localStorage.getItem('previousVersionMsgDismissed') === "true");

export const yourReportPanelOpen = writable(true);

export const basepath = writable(true);
// src/stores/hostReplacements.js
import { writable } from 'svelte/store';

// Helper function to get the replacements from localStorage or use an empty array
function getStoredReplacements() {
  const stored = localStorage.getItem('hostReplacements');
  return stored ? JSON.parse(stored) : [];
}

// Create a writable store with the initial value from localStorage
const hostReplacements = writable(getStoredReplacements());

// the mapping from original to replacement urls, maps original origin to replacement URL object 
const replacementMap= new Map();

// Subscribe to the store and update localStorage whenever the store changes
hostReplacements.subscribe((replacements) => {
  localStorage.setItem('hostReplacements', JSON.stringify(replacements));
  replacements.forEach(([original, replacement]) => {
    const oObj = new URL(original);
    const rObj = new URL(replacement);
    replacementMap.set(oObj.origin, rObj);
  })
});

function addReplacement(original, replacement) {
  if (original && replacement) {
    hostReplacements.update((replacements) => [
      [original, replacement],
      ...replacements,
    ]);
  }  
}

function removeReplacement(index) {
  hostReplacements.update((replacements) => {
    const updatedReplacements = [...replacements];
    updatedReplacements.splice(index, 1);
    return updatedReplacements;
  });
}

function replaceHost(url) {
  const usingStrings = typeof url === 'string';
  if (usingStrings) {
    url = new URL(url);
  }
  
  if (!replacementMap.has(url.origin)) {
    return usingStrings ? url.href : url;
  } else {
    const replaceWith = replacementMap.get(url.origin);
    url.protocol = replaceWith.protocol;
    url.host = replaceWith.host;    
    return usingStrings ? url.href : url;
  }
}

export {
  hostReplacements,
  addReplacement,
  removeReplacement,
  replaceHost,
}
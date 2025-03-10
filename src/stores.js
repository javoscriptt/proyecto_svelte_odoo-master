// src/stores.js
import { writable } from 'svelte/store';

// Guarda un array de apps seleccionadas
// Cada objeto app podría ser { label: '...', icon: '...', category: '...', etc. }
export const selectedApps = writable([]);

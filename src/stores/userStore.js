import { writable } from 'svelte/store';

export const user = writable({
  role: 'standard' // o 'admin' según sea necesario
});

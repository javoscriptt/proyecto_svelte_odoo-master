import { writable } from "svelte/store";

export const currentUser = writable(null); // Usuario autenticado
export const isAuthenticated = writable(false); // Estado de autenticación

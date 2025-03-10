import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';  // 🔥 Importamos 'path' para configurar alias

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, 'src/lib') // ✅ Ahora `$lib` apunta a `src/lib`
    }
  }
});

import { defineConfig } from 'astro/config';

// Fully static build: three pages, no server. Hosts anywhere.
export default defineConfig({
  devToolbar: { enabled: false },
});

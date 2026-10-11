import { defineConfig } from 'astro/config';

// Fully static build. Locally the site is served from "/". The deploy workflow passes
// the real address and sub-path (SITE_URL, BASE_PATH), so the same code works at
// shubhraj5575.github.io/portfolio-work/ today and on a custom domain later.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  devToolbar: { enabled: false },
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Hybrid-friendly: pages can opt into prerender; API routes stay on the Worker.
  adapter: cloudflare({
    // Media lives in R2 and is served as plain URLs — no image binding required.
    imageService: 'passthrough',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/cartoons": "/digital",
  },
  // Hybrid-friendly: pages can opt into prerender; API routes stay on the Worker.
  adapter: cloudflare({
    // Media lives in R2 and is served as plain URLs — no image binding required.
    imageService: 'passthrough',
  }),
  vite: {
    plugins: [
      tailwindcss(),
      // workerd still requests hashed SSR chunks after Vite rewrites them
      // (e.g. base-*.js 404 in deps_ssr). Freeze discovery so hashes stay put.
      {
        name: 'stabilize-ssr-optimize-deps',
        enforce: 'post',
        configEnvironment(name) {
          if (name === 'astro' || name === 'ssr' || name === 'prerender') {
            return {
              optimizeDeps: {
                noDiscovery: true,
                ignoreOutdatedRequests: true,
              },
            };
          }
        },
      },
    ],
  },
});

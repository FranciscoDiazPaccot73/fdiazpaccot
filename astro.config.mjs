import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
// Production API: Vercel `api/*` (no Astro adapter; avoids /var/task/entry.mjs).
// In dev, Vite proxies /api/* to the same upstreams so the form works without CORS.
const UPSTREAM = "https://api.franciscodiazpaccot.dev";

export default defineConfig({
  output: "static",
  vite: {
    server: {
      proxy: {
        "/api/contact": {
          target: UPSTREAM,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/contact$/, "/contact"),
        },
        "/api/submit": {
          target: UPSTREAM,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/submit$/, "/email/fran"),
        },
      },
    },
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
  ],
});

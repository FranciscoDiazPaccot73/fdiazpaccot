import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config — static `astro build` → dist/. API on Vercel: root `api/*.mjs` (no Astro adapter / no dist/server/entry.mjs on lambda).
// Dev: Vite proxy to upstream API to avoid CORS. Do not re-add @astrojs/vercel for this app unless you add real Astro SSR.
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

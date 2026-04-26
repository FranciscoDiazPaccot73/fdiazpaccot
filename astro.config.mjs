import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
// Adapter required for non-prerendered API routes (see src/pages/api/*.ts).
export default defineConfig({
  output: "static",
  // includeFiles: paths are project-relative; do not use globs (they are not expanded).
  adapter: vercel({
    includeFiles: [
      "dist/server/entry.mjs",
      "dist/server/renderers.mjs",
      "dist/server/_noop-middleware.mjs",
      "dist/server/manifest_*.mjs",
    ],
  }),
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
  ],
});

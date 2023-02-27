import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkGemoji from "remark-gemoji";
import remarkLinkCard from "./src/libs/remarkLinkCard";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://tuka.dev/",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      remarkGemoji,
      remarkLinkCard,
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  // TODO Issue: "'No loader is configured for ".node" files: node_modules/@resvg/resvg-js-linux-x64-xxx/resvgjs.linux-x64-xxx.node'"
  // see.
  //   - https://github.com/satnaing/astro-paper/issues/40
  //   - https://github.com/evanw/esbuild/issues/1051#issuecomment-1006992549
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

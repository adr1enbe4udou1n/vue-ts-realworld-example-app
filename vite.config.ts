import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import Pages from "vite-plugin-pages"
import { fileURLToPath, URL } from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    Vue(),
    Pages(),
    AutoImport({
      imports: [
        "vue",
        "vue/macros",
        "vue-router",
        "@vueuse/head",
        "@vueuse/core",
      ],
      vueTemplate: true,
    }),
    Components(),
    UnoCSS(),
  ],
})

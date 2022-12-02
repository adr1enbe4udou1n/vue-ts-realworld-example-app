/// <reference types="vitest" />

import * as path from "path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import Pages from "vite-plugin-pages"
import Layouts from "vite-plugin-vue-layouts"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue(),
    Pages(),
    Layouts(),
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
    Unocss(),
  ],
  test: {
    environment: "jsdom",
  },
})

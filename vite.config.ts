/// <reference types="vitest" />

import * as path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
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
    vue(),
    Pages(),
    Layouts(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/head", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      extensions: ["vue"],
      dts: "src/components.d.ts",
    }),
    Unocss(),
  ],
  test: {
    environment: "jsdom",
  },
})

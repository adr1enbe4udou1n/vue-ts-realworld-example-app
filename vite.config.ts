/// <reference types="vitest" />

import path from "node:path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import VueMacros from "unplugin-vue-macros/vite"
import VueRouter from "unplugin-vue-router/vite"
import { VueRouterAutoImports } from "unplugin-vue-router"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/head",
        "@vueuse/core",
        VueRouterAutoImports,
        {
          "vue-router/auto": ["useLink"],
        },
      ],
      vueTemplate: true,
    }),
    Components(),
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: "jsdom",
  },
})

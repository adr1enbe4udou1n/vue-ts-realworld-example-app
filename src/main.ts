import { createApp } from "vue"

import { createRouter, createWebHistory } from "vue-router"
import { setupLayouts } from "virtual:generated-layouts"
import generatedRoutes from "virtual:generated-pages"

import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"

import NProgress from "nprogress"

import App from "./App.vue"

import "@unocss/reset/tailwind.css"
import "./styles/main.css"
import "uno.css"
import { useFormsStore } from "./stores/forms"
import { useUserStore } from "./stores/user"

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (to.path !== from.path) NProgress.start()

  useFormsStore().$reset()

  await useUserStore().fetch()
})
router.afterEach(() => {
  NProgress.done()
})

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(createHead())

app.mount("#app")

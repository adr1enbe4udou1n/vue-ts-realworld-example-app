import { createApp } from "vue"

import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"

import App from "./App.vue"

import "@unocss/reset/tailwind.css"
import "./styles/main.css"
import "uno.css"
import { router } from "./plugins/router"
import { VueQueryPlugin } from "@tanstack/vue-query"

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(createHead())
app.use(VueQueryPlugin)

app.mount("#app")

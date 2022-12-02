import { createApp } from "vue"

import { createHead } from "@vueuse/head"
import { createPinia } from "pinia"

import App from "./App.vue"

import "./styles/main.css"
import "uno.css"
import { router } from "./plugins/router"

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(createHead())

app.mount("#app")

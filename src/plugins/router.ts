import { createRouter, createWebHistory } from "vue-router"
import { routes } from "vue-router/auto-routes"

import NProgress from "nprogress"

import { useUserStore } from "../stores/user.js"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (to.path !== from.path) {
    NProgress.start()
  }

  const userStore = useUserStore()

  try {
    await userStore.fetch()
  } catch (e) {
    console.error(e)
  }

  if (to.meta.auth === false && userStore.isLoggedIn && to.path !== "/") {
    return router.push("/")
  }

  if (to.meta.auth === true && !userStore.isLoggedIn) {
    return router.push("/login")
  }
})
router.afterEach(() => {
  NProgress.done()
})

export { router }

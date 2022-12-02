import { createRouter, createWebHistory } from "vue-router"

import NProgress from "nprogress"

import { useFormsStore } from "../stores/forms"
import { useUserStore } from "../stores/user"

import routes from "~pages"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (to.path !== from.path) NProgress.start()

  const userStore = useUserStore()

  try {
    await userStore.fetch()
  } catch (e) {
    console.error(e)
  }

  if (to.meta.auth === false && userStore.isLoggedIn) {
    return router.push("/")
  }

  if (to.meta.auth === true && !userStore.isLoggedIn) {
    return router.push("/login")
  }

  useFormsStore().$reset()
})
router.afterEach(() => {
  NProgress.done()
})

export { router }

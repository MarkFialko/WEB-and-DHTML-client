import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/app/router/routes'
import store from '@/app/store'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('account/getMe').catch(() => {
    if (
      to.matched.some((record) => record.meta.authRequired) &&
      !store.getters['account/getIsAuth']
    ) {
      router.push('/')
    }
  })

  next()
})

export default router

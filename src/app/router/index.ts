import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/app/router/routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  next()
})

export default router

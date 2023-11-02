import { type RouteRecordRaw } from 'vue-router'
import { Layouts } from '@/layouts/layouts.types'
import { Routes } from '@/app/router/types'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      layout: Layouts.APP
    },
    component: () => import('@/views/main-page/MainPage.vue')
  },

  {
    path: `/${Routes.LOGIN}`,
    meta: {
      layout: Layouts.BLANK
    },
    component: () => import('@/modules/account/views/Login.vue')
  },

  {
    path: `/${Routes.REGISTRATION}`,
    meta: {
      layout: Layouts.BLANK
    },
    component: () => import('@/modules/account/views/Registration.vue')
  },

  {
    path: `/${Routes.SHOPPING_CART}`,
    meta: {
      layout: Layouts.APP,
      authRequired: true
    },
    component: () => import('@/views/shopping-cart/ShoppingCart.vue')
  },

  {
    path: `/${Routes.ORDERS}`,
    meta: {
      layout: Layouts.ACCOUNT,
      authRequired: true
    },
    component: () => import('@/modules/account/views/Orders.vue')
  },

  {
    path: `/${Routes.ACCOUNT}`,
    meta: {
      layout: Layouts.ACCOUNT,
      authRequired: true
    },
    component: () => import('@/modules/account/Account.vue')
  }
]

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

]

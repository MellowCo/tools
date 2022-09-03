import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import TextRoutes from './modules/text'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/text',
    meta: {
      hide: true,
    },
  },
  ...TextRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

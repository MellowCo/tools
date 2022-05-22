/*
 * @Author: licl
 * @Date: 2022-05-21 20:02:09
 * @LastEditTime: 2022-05-22 18:48:44
 * @LastEditors: licl
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import ShopRoutes from './modules/shop'
import TestRoutes from './modules/test'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/shop',
    meta: {
      hide: true,
    },
  },
  ...ShopRoutes,
  ...TestRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

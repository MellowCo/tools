/*
 * @Author: licl
 * @Date: 2022-05-21 20:02:09
 * @LastEditTime: 2022-05-21 20:31:17
 * @LastEditors: licl
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import vRoutes from '~pages'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Layout,
  },
  ...vRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

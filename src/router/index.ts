/*
 * @Author: licl
 * @Date: 2022-05-21 20:02:09
 * @LastEditTime: 2022-05-22 15:50:54
 * @LastEditors: licl
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { Home } from '@vicons/ionicons5'
import Layout from '~/layout/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    meta: {
      icon: Home,
      title: '电商',
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('~/pages/home/index.vue'),
        meta: {
          title: '京东',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

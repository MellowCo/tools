/*
 * @Author: licl
 * @Date: 2022-05-22 18:34:13
 * @LastEditTime: 2022-05-22 18:34:14
 * @LastEditors: licl
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
import { ShopOutlined } from '@vicons/antd'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/shop',
    name: 'shop',
    component: Layout,
    redirect: '/shop/jd',
    meta: {
      icon: ShopOutlined,
      title: '电商',
    },
    children: [
      {
        path: 'jd',
        name: 'shopJd',
        component: () => import('~/pages/home/index.vue'),
        meta: {
          title: '京东',
        },
      },
    ],
  },
]

export default routes

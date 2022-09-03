import type { RouteRecordRaw } from 'vue-router'
import { FileTextOutlined } from '@vicons/antd'
import { Json } from '@vicons/carbon'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/text',
    name: 'text',
    component: Layout,
    redirect: '/text/json',
    meta: {
      icon: FileTextOutlined,
      title: '文本处理',
    },
    children: [
      {
        path: 'json',
        name: 'json',
        component: () => import('~/pages/text/json/index.vue'),
        meta: {
          title: 'json',
        },
      },
      {
        path: 'diff',
        name: 'diff',
        component: () => import('~/pages/text/diff/index.vue'),
        meta: {
          title: 'diff',
        },
      },
    ],
  },
]

export default routes


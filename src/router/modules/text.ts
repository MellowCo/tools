import type { RouteRecordRaw } from 'vue-router'
import { FileTextOutlined } from '@vicons/antd'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/text',
    name: 'text',
    component: Layout,
    redirect: '/text/json',
    meta: {
      icon: FileTextOutlined,
      title: '文本',
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
      {
        path: 'regex',
        name: 'regex',
        component: () => import('~/pages/text/regex/index.vue'),
        meta: {
          title: 'regex',
        },
      },
    ],
  },
]

export default routes


import type { RouteRecordRaw } from 'vue-router'
import { ExperimentTwotone } from '@vicons/antd'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/text',
    name: 'text',
    component: Layout,
    redirect: '/text/index',
    meta: {
      icon: ExperimentTwotone,
      title: '文本处理',
    },
    children: [
      {
        path: 'index',
        name: 'json',
        component: () => import('~/pages/text/json/index.vue'),
        meta: {
          title: 'json',
        },
      },
      {
        path: 'index2',
        name: 'testIndex2',
        component: () => import('~/pages/test/index2.vue'),
        meta: {
          title: '测试菜单2',
        },
      },
    ],
  },
]

export default routes


import type { RouteRecordRaw } from 'vue-router'
import { ExperimentTwotone } from '@vicons/antd'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    name: 'test',
    component: Layout,
    redirect: '/test/index',
    meta: {
      icon: ExperimentTwotone,
      title: '测试',
    },
    children: [
      {
        path: 'index',
        name: 'testIndex',
        component: () => import('~/pages/test/index.vue'),
        meta: {
          title: '测试菜单',
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


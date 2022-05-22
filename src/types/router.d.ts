import type { Component } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title?: string
    // 图片
    icon?: Component
    // 是否隐藏
    hide?: boolean
  }
}

/*
 * @Author: licl
 * @Date: 2022-05-21 21:19:08
 * @LastEditTime: 2022-05-22 18:49:00
 * @LastEditors: licl
 * @Description:
 */

import type { RouteRecordRaw } from 'vue-router'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'

/**
 * 渲染icon
 * @param icon
 */
export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 将路由转换成菜单
 * @param routes
 * @returns
 */
export function generateMenu(routes: RouteRecordRaw[]): MenuOption[] {
  const menu: MenuOption[] = []

  routes.forEach((route) => {
    const { children, name, meta, path } = route

    if (!meta?.hide) {
      const menuItem: MenuOption = {
        label: meta?.title || name,
        icon: meta?.icon && renderIcon(meta?.icon),
        key: name as string,
        path,
        meta,
      }

      if (children)
        menuItem.children = generateMenu(children)

      menu.push(menuItem)
    }
  })

  return menu
}

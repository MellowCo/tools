/*
 * @Author: licl
 * @Date: 2022-05-22 15:33:19
 * @LastEditTime: 2022-05-22 15:36:00
 * @LastEditors: licl
 * @Description:
 */

import { describe, expect, it } from 'vitest'
import { routes } from '~/router'
import { generateMenu } from '~/utils'

describe('menu', () => {
  it('menuOptions', () => {
    const menuOptions = generateMenu(routes)
    expect(menuOptions).toMatchInlineSnapshot(`
      [
        {
          "icon": undefined,
          "key": "index",
          "label": "index",
          "meta": undefined,
          "path": "/",
        },
        {
          "children": [
            {
              "icon": undefined,
              "key": "shopJd",
              "label": "京东",
              "meta": {
                "title": "京东",
              },
              "path": "jd",
            },
          ],
          "icon": [Function],
          "key": "shop",
          "label": "电商",
          "meta": {
            "icon": {
              "name": "ShopOutlined",
              "render": [Function],
            },
            "title": "电商",
          },
          "path": "/shop",
        },
        {
          "children": [
            {
              "icon": undefined,
              "key": "testIndex",
              "label": "测试菜单",
              "meta": {
                "title": "测试菜单",
              },
              "path": "index",
            },
            {
              "icon": undefined,
              "key": "testIndex2",
              "label": "测试菜单2",
              "meta": {
                "title": "测试菜单2",
              },
              "path": "index2",
            },
          ],
          "icon": [Function],
          "key": "test",
          "label": "测试",
          "meta": {
            "icon": {
              "name": "ExperimentTwotone",
              "render": [Function],
            },
            "title": "测试",
          },
          "path": "/test",
        },
      ]
    `)
  })
})


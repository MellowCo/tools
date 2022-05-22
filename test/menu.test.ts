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
          "children": [
            {
              "icon": [Function],
              "key": "home",
              "label": "电商",
              "meta": {
                "icon": {
                  "name": "Home",
                  "render": [Function],
                },
                "title": "电商",
              },
              "path": "/home",
            },
          ],
          "icon": [Function],
          "key": "home",
          "label": "电商",
          "meta": {
            "icon": {
              "name": "Home",
              "render": [Function],
            },
            "title": "电商",
          },
          "path": "/",
        },
      ]
    `)
  })
})


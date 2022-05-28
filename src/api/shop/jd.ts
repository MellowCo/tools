/*
 * @Author: licl
 * @Date: 2022-05-22 19:07:21
 * @LastEditTime: 2022-05-28 22:30:04
 * @LastEditors: licl
 * @Description:
 */
import { ResponseType, fetch } from '@tauri-apps/api/http'
import type { CheerioAPI } from 'cheerio'
import { load } from 'cheerio'

enum DOM_SELECTOR {
  SPEC_IMG = '#spec-list img',
}

export async function fetchJd(code: string) {
  const url = `https://item.jd.com/${code}.html`
  const { data } = await fetch<string>(url, {
    method: 'GET',
    responseType: ResponseType.Text,
  })

  const ch = load(data)

  const specImgUrls = getImgSrc(ch, DOM_SELECTOR.SPEC_IMG)

  return specImgUrls
}

function getImgSrc(ch: CheerioAPI, domSelector: string) {
  return n5ToN1(ch(domSelector).map((_, el) => ch(el).attr('src')).get())
}

function n5ToN1(urls: string[] | string) {
  if (Array.isArray(urls))
    return urls.map(url => url.replace('n5', 'n1'))
  else
    return urls.replace('n5', 'n1')
}


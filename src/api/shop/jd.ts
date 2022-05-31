/*
 * @Author: licl
 * @Date: 2022-05-22 19:07:21
 * @LastEditTime: 2022-05-31 20:56:04
 * @LastEditors: licl
 * @Description:
 */
import { ResponseType, fetch } from '@tauri-apps/api/http'
import type { CheerioAPI } from 'cheerio'
import json5 from 'json5'
import { addHttps } from '~/utils'

enum JD_CONFIG {
  IMG_BASE_URL = 'https://m.360buyimg.com/mobilecms/s750x750_',
  PRODUCT_URL = 'https://item.jd.com',
}

interface PageConfig {
  // 规格图列表
  imageList: string[]
  // 获取描述图片的网络地址
  desc: string
  // 商品名称
  name: string
}

export async function fetchJd(code: string) {
  const { imageList, desc } = await getJdHtml(code)

  const specImgs = getSpecImgs(imageList)
  const descImgs = await getDescImgs(desc)

  return {
    specImgs,
    descImgs,
  }
}

/**
 * 获取 jd 网页的 html
 * @param code - 商品编码
 */
export async function getJdHtml(code: string) {
  const url = `${JD_CONFIG.PRODUCT_URL}/${code}.html`

  const { data } = await fetch<string>(url, {
    method: 'GET',
    responseType: ResponseType.Text,
  })

  return getJdPageConfig(data)
}

/**
 * 获取jd商品页面的配置
 * @param jdHtml - jd商品页面的html
 */
export async function getJdPageConfig(jdHtml: string) {
  const pageConfigStr = jdHtml.match(/var pageConfig = ({[^;]*)/)![1]
  const pageConfig: PageConfig = json5.parse(pageConfigStr).product
  return pageConfig
}

/**
 * 获取商品规格图片
 * @param imageList - 商品规格图片列表
 */
export function getSpecImgs(imageList: string[]) {
  return imageList.map(url => JD_CONFIG.IMG_BASE_URL + url)
}

/**
 * 获取商品描述图片
 * @param desc - 商品描述的url
 */
export async function getDescImgs(desc: string) {
  const descUrl = addHttps(desc)
  const { data: { content } } = await fetch<{ content: string }>(descUrl)
  return Array.from(content.matchAll(/url\(([\/\d\w\.]*)\)/g)).map(item => item[1])
}

/**
 * 通过获取图片地址
 * @param ch - cheerio实例 - getJdHtml() => cheerio.load(html)
 * @param domSelector - 图片选择器  SPEC_IMG = '#spec-list img',
 */
export function getImgSrc(ch: CheerioAPI, domSelector: string): string[] {
  return transformImg(ch(domSelector).map((_, el) => ch(el).attr('src')).get()) as string[]
}

/**
 * 将图片地址转换为实际地址
 * @param urls - 图片地址
 */
function transformImg(urls: string[] | string) {
  if (Array.isArray(urls))
    return urls.map(url => replace(url))
  else
    return replace(urls)
}

function replace(url: string) {
  return url.replace(/54x54/g, '450x450').replace(/50x64/g, '350x449').replace(/50x66/g, '350x467').replace(/\/n5/g, '/n1')
}

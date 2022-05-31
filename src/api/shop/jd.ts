/*
 * @Author: licl
 * @Date: 2022-05-22 19:07:21
 * @LastEditTime: 2022-05-31 21:51:47
 * @LastEditors: licl
 * @Description:
 */
import { ResponseType, fetch } from '@tauri-apps/api/http'
import type { CheerioAPI } from 'cheerio'
import json5 from 'json5'
import { stringify } from 'qs'
import { addHttps } from '~/utils'

enum JD_CONFIG {
  IMG_BASE_URL = 'https://m.360buyimg.com/mobilecms/s750x750_',
  PRODUCT_URL = 'https://item.jd.com',
  BUSINESS_URL = 'https://item-soa.jd.com/getWareBusiness',
}

export interface JdProduct {
  name: string
  specImgs: string[]
  descImgs: string[]
  price: string
}

// skuId: 100019718235
// cat: 670,671,2694
// area: 15_1290_1291_59463
// shopId: 1000000127
// venderId: 1000000127
// paramJson: {"platform2":"100000000001","specialAttrStr":"p0ppppppppp2p1pppppppppppp","skuMarkStr":"00"}
// num: 1

interface PageConfig {
  // 规格图列表
  imageList: string[]
  // 获取描述图片的网络地址
  desc: string
  // 商品名称
  name: string
  skuid: number
  cat: number[]
  shopId: string
  venderId: number
  paramJson: string
}

export async function fetchJd(code: string): Promise<JdProduct> {
  const pageConfig = await getJdHtml(code)
  const { imageList, desc, name } = pageConfig

  const specImgs = getSpecImgs(imageList)
  const descImgs = await getDescImgs(desc)
  const price = await getBusiness(pageConfig)

  return {
    specImgs,
    descImgs,
    name,
    price,
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

export async function getBusiness(pageConfig: PageConfig) {
  const { cat, paramJson, shopId, skuid, venderId } = pageConfig

  const queryData = {
    paramJson,
    shopId,
    skuId: skuid,
    venderId,
    cat: cat.join(','),
    area: '15_1290_1291_59463',
    num: 1,
  }

  const url = `${JD_CONFIG.BUSINESS_URL}?${stringify(queryData)}`

  const { data } = await fetch<{ price: { p: string } }>(url, {
    method: 'GET',
  })

  return data.price.p
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

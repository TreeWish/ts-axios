import { url } from 'inspector'
import { isDate, isPlainObject } from './util'

function encode(params: string): string {
  return encodeURIComponent(params)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 将空替换为 +， 约定
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export default function buildUrl(url: string, params?: any) {
  // params 不传/为空
  if (!params) {
    return url
  }
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    // key: null
    if (val === null || typeof val === undefined) {
      return
    }
    // 统一格式处理，都先把变成[]
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    let markIndex = parts.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

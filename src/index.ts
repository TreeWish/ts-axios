// 创建入口文件
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import buildUrl from './helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponsetData(res)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformRequestData(config: AxiosRequestConfig): string {
  const { data } = config
  return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponsetData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios

import { AxiosRequestConfig, AxiosResponse, AxiosTransformer } from "../types";

export default function transform(data: any, config: any, fn?: AxiosTransformer | AxiosTransformer[]) {
  if(!fn) {
    return data
  }
  if(!Array.isArray(fn)) {
    fn = [fn]
  }
  fn.forEach(item => {
    data = item(data, config)
  })
  return data
}
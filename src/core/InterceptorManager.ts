import { RejectFn, ResolveFn } from '../types'

interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T>>
  constructor() {
    this.interceptors = []
  }
  // 添加拦截器
  use(resolved: ResolveFn, rejected?: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length
  }
  // 删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  // 遍历
  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}

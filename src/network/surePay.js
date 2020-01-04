import { request } from './request'

export function toMoPalaceOrder() {
  return request({
    url: '/trade/toMoPalaceOrder.shtml',
    method: 'post'
  })
}

import { request } from './request'

export function orderMo(type = 0) {
  return request({
    url: '/ord/orderMo.shtml',
    params: { type },
    method: 'post'
  })
}

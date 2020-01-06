import { request } from './request'

export function indexMobileTop() {
  return request({
    url: '/indexMobileTop.shtml',
    method: 'post'
  })
}

export function indexHotList(vm) {
  return request({
    url: '/indexHotList.shtml',
    method: 'post'
  }, vm)
}

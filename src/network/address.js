import { request } from './request'

export function addressMo() {
  return request({
    url: '/person/addressMo.shtml',
    method: 'post'
  })
}

export function insertAddr(params) {
  return request({
    url: '/user/insertAddr.shtml',
    params: params,
    method: 'post'
  })
}

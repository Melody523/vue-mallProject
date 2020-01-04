import { request } from './request'

export function queryCountryList() {
  return request({
    url: '/goods/queryCountryList.shtml',
    method: 'post'
  })
}


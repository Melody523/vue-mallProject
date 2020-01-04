import { request } from './request'

export function queryBrandList(brandName = '') {
  return request({
    url: '/brand/queryBrandList.shtml',
    params: { brandName },
    method: 'post'
  })
}

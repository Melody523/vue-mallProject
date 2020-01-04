import { request } from './request'

export function shopCarIndexMobile() {
  return request({
    url: '/trade/shopCarIndexMobile.shtml',
    method: 'post'
  })
}

export function addShopCar(params) {
  return request({
    url: '/trade/addShopCar.shtml',
    params: params,
    method: 'post'
  })
}

export function delShopCar(params) {
  return request({
    url: '/trade/delShopCar.shtml',
    params: params,
    method: 'post'
  })
}

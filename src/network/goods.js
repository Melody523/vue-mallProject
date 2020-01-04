import { request } from './request'

export function getDetailMo(goodsNo) {
  return request({
    url: '/goods/getDetailMo.shtml',
    params: {goodsNo},
    method: 'post'
  })
}

export function getPostRule(params) {
  return request({
    url: '/goods/getPostRule.shtml',
    params: params,
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

export function carCount() {
  return request({
    url: '/carCount.shtml',
    method: 'post'
  })
}

export function insertCollect(goodsId) {
  return request({
    url: '/person/insertCollect.shtml',
    params: { goodsId },
    method: 'post'
  })
}

export function delCollectByGoodsId(goodsIds) {
  return request({
    url: '/person/delCollectByGoodsId.shtml',
    params: { goodsIds },
    method: 'post'
  })
}

export function addNotify(params) {
  return request({
    url: '/goods/notify/addNotify.shtml',
    params: params,
    method: 'post'
  })
}

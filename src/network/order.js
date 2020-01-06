import { request } from './request'

export function orderMo(type = 0) {
  return request({
    url: '/ord/orderMo.shtml',
    params: { type },
    method: 'post'
  })
}

export function updateTrade(params) {
  return request({
    url: '/trade/updateTrade.shtml',
    params: params,
    method: 'post'
  })
}

export function updateStatus(params) {
  return request({
    url: '/ord/updateStatus.shtml',
    params: params,
    method: 'post'
  })
}

export function delTrade(params) {
  return request({
    url: '/ord/delTrade.shtml',
    params: params,
    method: 'post'
  })
}

export function tradeMoDetail(params) {
  return request({
    url: '/ord/tradeMoDetail.shtml',
    params: params,
    method: 'post'
  })
}

export function toPay(params) {
  return request({
    url: '/trade/toPay.shtml',
    params: params,
    method: 'post'
  })
}

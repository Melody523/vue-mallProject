import { request } from './request'

export function getNotice() {
  return request({
    url: '/active/getNotice.shtml',
    method: 'post'
  })
}

export function myTradeCount() {
  return request({
    url: '/ord/myTradeCount.shtml',
    method: 'post'
  })
}

export function getMyConpou(params) {
  return request({
    url: '/coupon/getMyConpou.shtml',
    params: params,
    method: 'post'
  })
}

export function loginOut() {
  return request({
    url: '/user/loginOut.shtml',
    method: 'post'
  })
}

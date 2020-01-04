import { request } from './request'

export function sendMoRandmoCode(mobile, type = 2) {
  return request({
    url: '/user/sendMoRandmoCode.shtml',
    params: { mobile,  type},
    method: 'get'
  })
}

export function getpublickey() {
  return request({
    url: '/user/getpublickey.shtml',
    method: 'post'
  })
}

export function userRegister(params) {
  return request({
    url: '/user/userRegister.shtml',
    params: params,
    method: 'post'
  })
}

export function checkMoMobile(mobile) {
  return request({
    url: '/user/checkMoMobile.shtml',
    params: { mobile },
    method: 'post'
  })
}

export function checkMobileCodePwd(params) {
  return request({
    url: '/user/checkMobileCodePwd.shtml',
    params: params,
    method: 'post'
  })
}

export function login(mobile, password, type = 1) {
  return request({
    url: '/user/login.shtml',
    params: { mobile, password, type },
    method: 'post'
  })
}

export function checkUser() {
  return request({
    url: '/user/checkUser.shtml',
    method: 'post'
  })
}

export function findPwdByUpdate(params) {
  return request({
    url: '/user/findPwdByUpdate.shtml',
    params: params,
    method: 'post'
  })
}

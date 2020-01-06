import { request } from './request'

export function saveUserDetail(nickName) {
  return request({
    url: '/person/saveUserDetail.shtml',
    params: { nickName },
    method: 'post'
  })
}

export function sendMoRandmoCode(type = 1) {
  return request({
    url: '/user/sendMoRandmoCode.shtml',
    params: { type },
    method: 'post'
  })
}

export function checkMobileCodePwd(code) {
  return request({
    url: '/user/checkMobileCodePwd.shtml',
    params: { code },
    method: 'post'
  })
}

export function randomCodeUpdateCell(params) {
  return request({
    url: '/user/randomCodeUpdateCell.shtml',
    params: params,
    method: 'post'
  })
}

export function updateCellByCell(params) {
  return request({
    url: '/user/updateCellByCell.shtml',
    params: params,
    method: 'post'
  })
}

export function updateMoPwdByPwd(params) {
  return request({
    url: '/person/updateMoPwdByPwd.shtml',
    params: params,
    method: 'post'
  })
}

export function uploadPic(params) {
  return request({
    url: '/uploadPic.shtml',
    params: params,
    method: 'post'
  })
}
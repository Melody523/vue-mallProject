import { request } from './request'

export function newNotice() {
  return request({
    url: '/active/newNotice.shtml',
    method: 'post'
  })
}

export function getNotice() {
  return request({
    url: '/active/getNotice.shtml',
    method: 'post'
  })
}

export function getDetailById(id) {
  return request({
    url: '/active/getDetailById.shtml',
    params: { id },
    method: 'post'
  })
}

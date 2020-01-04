import { request } from './request'

export function myMoCollect(params) {
  return request({
    url: '/person/myMoCollect.shtml',
    params: params,
    method: 'post'
  })
}

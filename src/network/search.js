import { request } from './request'

export function getTextSearch() {
  return request({
    url: '/find/getTextSearch.shtml',
    method: 'post'
  })
}

export function getHotSearch() {
  return request({
    url: '/find/getHotSearch.shtml',
    method: 'post'
  })
}

export function insertSearch(searchName) {
  return request({
    url: '/records/insertSearch.shtml',
    params: { searchName },
    method: 'post'
  })
}

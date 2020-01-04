import { request } from './request'

export function themeBanner(id) {
  return request({
    url: '/find/themeBanner.shtml',
    params: { themeId: id },
    method: 'post'
  })
}

export function searchGoods(themeId, pageNum, pageSize = 20) {
  return request({
    url: '/solr/searchGoods.shtml',
    params: { themeId, pageNum, pageSize },
    method: 'post'
  })
}

export function searchGoodsList(params) {
  return request({
    url: '/solr/searchGoods.shtml',
    params: params,
    method: 'post'
  })
}

export function getSolrGroup(params) {
  return request({
    url: '/solrGoods/getSolrGroup.shtml',
    params: params,
    method: 'post'
  })
}

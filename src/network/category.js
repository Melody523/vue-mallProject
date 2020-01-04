import { request } from './request'

export function getCategory() {
  return request({
    url: '/category/getCategory.shtml',
    method: 'post'
  })
}

export function getCategoryTwo(categoryId = 1) {
  return request({
    url: '/category/getCategoryTwo.shtml',
    params: {categoryId},
    method: 'post'
  })
}

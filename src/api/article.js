import request from '@/utils/request'
/**
 * 获取频道的文章列表
 */
export const getArticlesByChannel = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

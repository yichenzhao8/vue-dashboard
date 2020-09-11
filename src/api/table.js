import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'https://api.thecatapi.com/v1/images/search',
    method: 'get',
    params
  })
}

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }

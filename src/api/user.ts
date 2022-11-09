import http from '@/utils/request'

export function login(data: any) {
  return http.request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token: string) {
  return http.request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return http.request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function test() {
  return http.request({
    url: '/api/get',
    method: 'get'
  })
}

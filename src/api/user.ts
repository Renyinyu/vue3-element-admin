import http from '@/utils/request'
import { LoginParams, LoginResult } from '@/types'

export function login(data: LoginParams) {
  return http.request<LoginResult>({
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


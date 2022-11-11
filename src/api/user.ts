import http from '@/utils/request'

export function login(data: any) {
  try {
    return http.request({
      url: '/vue-element-admin/user/login',
      method: 'post',
      data
    })
  } catch (error) {
    return Promise.reject(error)
  }
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


import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'
import { ElMessage } from 'element-plus'
import { LoginParams } from '@/types/user'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  actions: {
    async login(userInfo: LoginParams) {
      try {
        const { username, password } = userInfo
        const { data } = await login({ username, password })
        console.log('user data:', data)
        const token = data.token
        this.token = token
        setToken(token)      
        return data
      } catch (error: any) {
        ElMessage({ message: error.message, type: 'error' })
        return Promise.reject(error)
      }
    },

    getInfo() {
      console.log('get info')
    },

    logout() {
      console.log('logout')
    },

    resetToken() {
      console.log('resetToken')
    },

    changeRoles() {
      console.log('changeRoles')
    },
  }
})

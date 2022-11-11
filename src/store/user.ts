import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  actions: {
    async login(userInfo: any) {
      try {
        const { username, password } = userInfo
        const response = await login({ username, password }).catch()
        console.log('user data:', response)        
      } catch (error) {
        console.log(error)
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

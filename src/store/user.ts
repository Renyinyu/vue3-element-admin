import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo, test } from '@/api/user'

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
        // { username, password }
        const response = await test()
        console.log('user data:', response)        
      } catch (error) {
        console.log(error)
      }
    },

    getInfo() {},

    logout() {},

    resetToken() {},

    changeRoles() {},
  }
})

import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store/user'
import { ElMessage, ElMessageBox } from 'element-plus'

class Http {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.registerInterceptors()
  }

  async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig) {
    try {
      const response = await this.instance.request<D>(config)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  private registerInterceptors() {
    this.requestInterceptor()
    this.responseInterceptor()
  }

  private requestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        const user = useUserStore()
        if (!user.token && config.headers) {
          config.headers['X-Token'] = getToken()
        }
        return config
      },
      (error) => {
        console.log('request interceptors error:', error)
        return Promise.reject(error)
      }
    )
  }

  private responseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        const user = useUserStore()
        const res = response.data
        if (res.code !== 2000) {
          ElMessage.error({
            message: res.message || 'Error',
            duration: 5 * 1000
          })

          if ([50008, 50012, 50014].includes(res.code)) {
            ElMessageBox.confirm(
              'You have been logged out, you can cancel to stay on this page, or log in again',
              'Confirm logout',
              {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
              }
            ).then(() => {
              user.resetToken()
              location.reload()
            })
          }

          return Promise.reject(new Error(res.message || 'Error'))
        }
        return response
      },
      (error) => {
        console.log('response error:', error)
        ElMessage.error({ message: error.message, duration: 5 * 1000 })
        return Promise.reject(error)
      }
    )
  }
}

export default Http

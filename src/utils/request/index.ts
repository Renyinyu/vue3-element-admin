import Http from './Http'

const http = new Http({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10 * 1000
})

export default http

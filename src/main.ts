import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupPinia } from '@/store'
import './assets/styles/main.scss'

const app = createApp(App)
setupPinia(app)
setupRouter(app)
app.mount('#app')

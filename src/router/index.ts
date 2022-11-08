import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

function setupRouter(app: App) {
  app.use(router)
}

export { setupRouter }

export default router

import { createPinia } from 'pinia'
import { App } from 'vue';

function setupPinia(app: App) {
  app.use(createPinia())
}

export  { setupPinia }


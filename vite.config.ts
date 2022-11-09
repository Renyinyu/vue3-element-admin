import path from 'path'
import { defineConfig, ConfigEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/

export default defineConfig(({ command }: ConfigEnv) => ({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command == 'serve'
    })

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))

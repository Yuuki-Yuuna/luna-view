import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import defineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  plugins: [vue(), vueJsx(), defineOptions()],
  server: {
    host: '127.0.0.1',
    port: 5000
  }
})

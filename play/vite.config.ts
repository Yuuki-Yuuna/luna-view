import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import defineOptions from 'unplugin-vue-define-options/vite'
import { lvRoot } from '@luna-view/build-config'

export default defineConfig({
  plugins: [vue(), vueJsx(), defineOptions()],
  resolve: {
    alias: {
      'luna-view': path.resolve(lvRoot, 'index.ts')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5000
  }
})

import path from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite' //自动引入组件
import { lvRoot } from '@luna-view/build-config'
import MarkdownTransform from './.vitepress/plugins/markdown-transform'

export default defineConfig({
  plugins: [
    DefineOptions(),
    vueJsx(),
    MarkdownTransform(),
    Components({
      dirs: ['.vitepress/vitepress/components'],
      allowOverrides: true,
      // 在md中自动引入组件
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    })
  ],
  resolve: {
    alias: {
      'luna-view': path.resolve(lvRoot, 'index.ts')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8080
  }
})

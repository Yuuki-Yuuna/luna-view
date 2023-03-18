import DefaultTheme from 'vitepress/theme'
import '@luna-view/theme/src/index.scss'
import 'nprogress/nprogress.css' //样式
import 'highlight.js/styles/agate.css'
import './style.scss'

import type { Theme } from 'vitepress'

const { Layout, NotFound } = DefaultTheme

export default {
  NotFound,
  Layout,
  async enhanceApp(ctx) {
    // SSG生成时没有例如window和docment一类的浏览器环境，会报错，条件导入
    if (!import.meta.env.SSR) {
      const nprogress = await import('nprogress')//引入nprogress
      //vitepress的路由基于vue-router，在这添加方便快捷
      ctx.router.onBeforeRouteChange = () => {
        nprogress.start()
      }
      ctx.router.onAfterRouteChanged = () => {
        nprogress.done()
      }
    }
  }
} as Theme

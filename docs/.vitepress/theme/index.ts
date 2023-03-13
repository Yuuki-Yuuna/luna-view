import DefaultTheme from 'vitepress/theme'
import nprogress from 'nprogress' //引入nprogress
import '@luna-view/theme/src/index.scss'
import 'nprogress/nprogress.css' //样式
import 'highlight.js/styles/agate.css'
import './style.scss'

import type { Theme } from 'vitepress'

const { Layout, NotFound } = DefaultTheme

export default {
  NotFound,
  Layout,
  enhanceApp(ctx) {
    //vitepress的路由基于vue-router，在这添加方便快捷
    ctx.router.onBeforeRouteChange = () => {
      nprogress.start()
    }
    ctx.router.onAfterRouteChanged = () => {
      nprogress.done()
    }
  }
} as Theme

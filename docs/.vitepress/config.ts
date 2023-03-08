import { mdPlugin, nav, sidebar } from './option'

import type { UserConfig } from 'vitepress'

export const config: UserConfig = {
  title: 'Luna View',
  description: 'a Vue 3 based component library',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/favicon.ico',
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/Yuuki-Yuuna/luna-view' }],
    outline: 'deep',
    outlineTitle: '目录'
  },
  markdown: {
    config: mdPlugin
  }
}

export default config

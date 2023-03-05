import { mdPlugin } from './option'

import type { UserConfig } from 'vitepress'

export const config: UserConfig = {
  title: 'Luna View',
  description: 'a Vue 3 based component library',
  lastUpdated: true,
  lang: 'zh-CN',
  themeConfig: {
    logo: '/favicon.ico'
  },
  markdown: {
    config: mdPlugin
  }
}

export default config

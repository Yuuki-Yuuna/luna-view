import type { App, Plugin } from '@vue/runtime-core' //@vue/runtime-core和vue导出的类型居然不一样！！！

export const makeinstaller = (components: Plugin[]): Plugin => {
  return (app: App) => {
    components.forEach((c) => app.use(c))
  }
}

import type { SFCWithInstall } from '../typescript'

//main传入组件，extra传入对象（字符串为键，组件为值）
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app): void => {
    //得到组件数组
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }

  return main as SFCWithInstall<T> & E
}

// 不做任何操作(可能是为了统一用户调用的组件类型？)
export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = () => {}

  return component as SFCWithInstall<T>
}

// 函数安装
export const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app) => {
    // 一个用于注册能够被应用内所有组件实例访问到的全局属性的对象
    app.config.globalProperties[name] = fn
  }

  return fn as SFCWithInstall<T>
}

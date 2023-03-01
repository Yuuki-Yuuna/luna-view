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

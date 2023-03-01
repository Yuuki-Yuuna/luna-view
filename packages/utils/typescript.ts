import type { Plugin } from 'vue'

//插件可以是一个带 install() 方法的对象，亦或直接是一个将被用作 install() 方法的函数

export type SFCWithInstall<T> = T & Plugin //将组件转为插件

//vue框架class属性类型
type ClassObjectType = Record<string, boolean>
export type ClassType = string | ClassObjectType | ClassType[]

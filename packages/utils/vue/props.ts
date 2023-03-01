import type { PropType } from 'vue'

type PropsType<T> = Record<
  string,
  {
    type: PropType<T>
    required?: boolean
    validator?: (val: any) => boolean
    default?: (() => T) | T
  }
>

export const definePropType = <T>(val: any): PropType<T> => val

//vue的props对象写法，支持参数type，default，require，validator
export const buildProps = <Props extends PropsType<any>>(props: Props) => props

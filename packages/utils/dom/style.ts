import { isNumber, isString } from '@vueuse/core'

export const classNameToArray = (className = '') =>
  className.split(' ').filter((item) => !!item.trim())

// 是否具有单个类名
export const hasClass = (element: Element, className: string): boolean => {
  if (!element || !className) {
    return false
  }
  if (className.includes(' ')) {
    throw new Error('类名不能包含空格')
  }
  return element.classList.contains(className)
}

export const addClass = (element: Element, className: string) => {
  if (!element || !className.trim()) {
    return
  }
  element.classList.add(...classNameToArray(className))
}

export const removeClass = (element: Element, className: string) => {
  if (!element || !className.trim()) {
    return
  }
  element.classList.remove(...classNameToArray(className))
}

// 用于调整单位
export const addUnit = (value?: string | number, unit = 'px') => {
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return value + unit
  } else {
    return ''
  }
}

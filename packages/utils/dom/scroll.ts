import { isClient } from '@vueuse/core'

let scrollBarWidth: number
export const getScrollBarWidth = (namespace: string) => {
  if (!isClient) {
    return 0
  }
  if (scrollBarWidth !== undefined) {
    return scrollBarWidth
  }

  // 滚动条的宽度不随容器任何属性改变，随便创建一个元素并展示其滚动条即可计算
  const outer = document.createElement('div')
  outer.className = `${namespace}-scrollbar__wrap`
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth

  outer.parentNode?.removeChild(outer) //及时移除
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}

import { isRef, onScopeDispose, watch } from 'vue'
import { isClient } from '@vueuse/core'
import { addClass, getScrollBarWidth, hasClass, removeClass } from '@luna-view/utils'
import { useNamespace } from '../use-namespace'

import type { Ref } from 'vue'

// trigger为true时锁住滚动条
export const useLockscreen = (trigger: Ref<boolean>) => {
  if (!isRef(trigger)) {
    throw new Error('传入的trigger不是响应式变量')
  }

  const ns = useNamespace('popup')

  const hiddenClass = ns.bm('parent', 'hidden') //具有overflow: hidden属性的类

  if (!isClient || hasClass(document.body, hiddenClass)) {
    return
  }

  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyWidth = '0'

  const cleanup = () => {
    setTimeout(() => {
      removeClass(document.body, hiddenClass)
      if (withoutHiddenClass) {
        document.body.style.width = bodyWidth
      }
    }, 200)
  }

  watch(trigger, (val) => {
    if (!val) {
      cleanup()
      return
    }
    withoutHiddenClass = !hasClass(document.body, hiddenClass)
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width
    }
    scrollBarWidth = getScrollBarWidth(ns.namespace)
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = document.body.style.overflowY
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    }
    addClass(document.body, hiddenClass)
  })
  onScopeDispose(() => cleanup()) //相关的effect作用域停止时会调用这个回调函数
}

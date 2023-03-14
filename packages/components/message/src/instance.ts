import { shallowReactive } from 'vue'

import type { ComponentInternalInstance, VNode } from 'vue'
import type { Mutable } from '@luna-view/utils'
import type { MessageHandler, MessageProps } from './message'

export type MessageContext = {
  id: string
  vnode: VNode
  handler: MessageHandler
  vm: ComponentInternalInstance
  props: Mutable<MessageProps>
}

// 所有的message实例，本文件存放查找相关方法
export const instances = shallowReactive<MessageContext[]>([])

export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  const current = instances[idx]
  const prev = idx > 0 ? instances[idx - 1] : undefined
  return { current, prev }
}

// 前一个message底部距顶端距离
export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id)
  if (!prev) {
    return 0
  }
  return prev.vm.exposed!.bottom.value
}

// 非第一个返回space，否则返回offest
export const getOffsetOrSpace = (id: string, offset: number) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  return idx > 0 ? 20 : offset
}

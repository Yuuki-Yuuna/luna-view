import { createVNode, isVNode, render } from 'vue'
import { isFunction, isString } from '@vueuse/core'
import { useZIndex } from '@luna-view/hooks'
import { isElement } from '@luna-view/utils'
import MessageConstructor from './message.vue'
import { messageDefaults, messageTypes } from './message'
import { instances } from './instance'

import type {
  Message,
  MessageFn,
  MessageHandler,
  MessageOptions,
  MessageParams,
  MessageParamsNormalized,
  MessageProps,
  MessageType
} from './message'
import type { MessageContext } from './instance'

let seed = 1 //id序号

//标准化配置项
const normalizeOptions = (params?: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params }
      : params
  const normalized = {
    ...messageDefaults,
    ...options
  }

  if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo)
    appendTo = isElement(appendTo) ? appendTo : document.body
    normalized.appendTo = appendTo
  }
  return normalized as MessageParamsNormalized
}

const closeMessage = (instance: MessageContext) => {
  const idx = instances.indexOf(instance)
  if (idx === -1) return

  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

const createMessage = (options: MessageParamsNormalized) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const container = document.createElement('div')

  const props = {
    ...options,
    zIndex: nextZIndex() + options.zIndex,
    id,
    onClose: () => {
      userOnClose?.()
      closeMessage(instance)
    },
    // 清除message阻止mem泄露(看不懂)，这个应该就是message组件emit的接收函数
    onDestroy: () => {
      //由于元素已销毁，因此GC也应收集VNode
      //我们不希望导致任何mem泄漏，因为我们已将vm作为引用返回给用户
      //因此我们手动将其设置为false。
      render(null, container) //vnode不再被任何人引用，自然被回收
    }
  }

  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message) ? props.message : () => props.message
        }
      : null
  )
  render(vnode, container) //将vnode渲染到容器中
  options.appendTo.appendChild(container.firstElementChild!) //当调用close函数时，实例将删除此项

  const vm = vnode.component!

  const handler: MessageHandler = {
    // 设置这个值可以获得完整生命周期而不设置onClose
    // 所有关闭步骤都不会跳过这步
    close: () => {
      vm.exposed!.visible.value = false
    }
  }

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    // vnode.props不是proxy对象，proxy对象类型与普通对象类型一致
    props: vnode.component!.props as MessageProps
  }

  return instance
}

// 这个函数中暂时不会添加success一类的函数，故均为可选值(Partial)
const message: MessageFn & Partial<Message> = (options) => {
  const normalized = normalizeOptions(options)

  // 重复消息合并
  if (normalized.grouping && instances.length) {
    const instance = instances.find(({ vnode }) => vnode.props?.message === normalized.message)
    if (instance) {
      instance.props.repeatNum += 1
      instance.props.type = normalized.type
      return instance.handler
    }
  }

  const instance = createMessage(normalized)
  instances.push(instance)
  return instance.handler
}

// 这里用function声明可以使用this，不过我讨厌this
export const closeAll = (type?: MessageType) => {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.handler.close()
    }
  }
}
message.closeAll = closeAll

messageTypes.forEach((type) => {
  message[type] = (options) => {
    const normalized = normalizeOptions(options)
    return message({ ...normalized, type })
  }
})

export default message as Message

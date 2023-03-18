import { isClient } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'

import type { Component, ExtractPropTypes, VNode } from 'vue'
import type { Mutable } from '@luna-view/utils'
import type Message from './message.vue'

export const messageTypes = ['success', 'info', 'warning', 'error'] as const
export type MessageType = (typeof messageTypes)[number]

export const messageDefaults = {
  customClass: '',
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never) // 不检测使用SSR和SSG会报错，vitepress使用踩雷
} as const

export const messageProps = buildProps({
  message: {
    type: definePropType<string | VNode | (() => VNode)>([String, Object, Function]),
    default: messageDefaults.message
  },
  type: {
    type: definePropType<MessageType>(String),
    default: messageDefaults.type
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  icon: {
    type: definePropType<string | Component>([String, Object, Function]),
    default: messageDefaults.icon
  },
  //改变文字颜色
  changeTextColor: {
    type: Boolean,
    default: true
  },
  dangerouslyUseHTML: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  center: {
    type: Boolean,
    default: messageDefaults.center
  },
  onClose: {
    type: definePropType<() => void>(Function)
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
} as const)
export type MessageProps = ExtractPropTypes<typeof messageProps>

export const messageEmits = {
  destroy: () => true
}
export type MessageEmits = typeof messageEmits

export type MessageInstance = InstanceType<typeof Message>

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>
export type MessageParams = MessageOptions | MessageOptions['message'] //只传入消息或配置项
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  appendTo: HTMLElement
}
//message.success一类的参数类型
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>
export type MessageParamsWithType = MessageOptionsWithType | MessageOptions['message']

export interface MessageHandler {
  close: () => void
}

export type MessageFn = {
  (options?: MessageParams): MessageHandler
  closeAll(type?: MessageType): void
}
export type MessageTypedFn = (options?: MessageParamsWithType) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}

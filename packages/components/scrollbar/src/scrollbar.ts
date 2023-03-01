import { isNumber } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { ClassType } from '@luna-view/utils'
import type Scrollbar from './scrollbar.vue'

export const scrollbarProps = buildProps({
  height: {
    type: definePropType<string | number>([String, Number]),
    default: ''
  },
  maxHeight: {
    type: definePropType<string | number>([String, Number]),
    default: ''
  },
  native: {
    type: Boolean,
    default: false
  },
  wrapStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: ''
  },
  wrapClass: {
    type: definePropType<ClassType>([String, Object, Array]),
    default: ''
  },
  viewClass: {
    type: definePropType<ClassType>([String, Object, Array]),
    default: ''
  },
  viewStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: ''
  },
  noresize: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'div'
  },
  always: {
    type: Boolean,
    default: false
  },
  minSize: {
    type: Number,
    default: 20
  },
  //是否平滑滚动
  smooth: {
    type: Boolean,
    default: false
  }
} as const)
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

export const scrollbarEmits = {
  scroll: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) =>
    [scrollTop, scrollLeft].every(isNumber) //都能通过isNumber测试
}
export type ScrollbarEmits = typeof scrollbarEmits

export type ScrollbarInstance = InstanceType<typeof Scrollbar>

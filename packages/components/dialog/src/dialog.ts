import { isBoolean } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'
import { dialogContentProps } from './dialog-content'

import type { ExtractPropTypes } from 'vue'
import type { ClassType } from '@luna-view/utils'
import type Dialog from './dialog.vue'

type DoneFn = (cancel?: boolean) => void
export type DialogBeforeCloseFn = (done: DoneFn) => void

export const dialogProps = buildProps({
  ...dialogContentProps,
  modelValue: {
    type: Boolean
  },
  //遮罩层开关
  modal: {
    type: Boolean,
    default: true
  },
  modalClass: {
    type: definePropType<ClassType>([String, Array, Object])
  },
  zIndex: {
    type: Number
  },
  top: {
    type: definePropType<string | number>([String, Number])
  },
  width: {
    type: definePropType<string | number>([String, Number])
  },
  //点击遮罩关闭对话框
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: definePropType<DialogBeforeCloseFn>(Function)
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  // 锁定滚动条
  lockScroll: {
    type: Boolean,
    default: false
  }
} as const)
export type DialogProps = ExtractPropTypes<typeof dialogProps>

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  'update:modelValue': (value: boolean) => isBoolean(value)
}
export type DialogEmits = typeof dialogEmits

export type DialogInstance = InstanceType<typeof Dialog>

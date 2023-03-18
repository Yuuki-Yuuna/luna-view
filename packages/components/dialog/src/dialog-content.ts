import { buildProps, iconPropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type DialogContent from './dialog-content.vue'

export const dialogContentProps = buildProps({
  // 内容居中
  center: {
    type: Boolean,
    default: false
  },
  // 对话框水平垂直居中
  alignCenter: {
    type: Boolean,
    default: false
  },
  closeIcon: {
    type: iconPropType
  },
  customClass: {
    type: String
  },
  draggable: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  }
} as const)
export type DialogContentProps = ExtractPropTypes<typeof dialogContentProps>

export const dialogContentEmits = {
  close: () => true
}
export type DialogContentEmits = typeof dialogContentEmits

export type DialogContentInstance = InstanceType<typeof DialogContent>

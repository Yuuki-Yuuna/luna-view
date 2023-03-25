import { isNumber } from '@vueuse/core'
import { buildProps } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Video from './video.vue'

export const videoProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  src: {
    type: String
  },
  // //允许倍速播放
  // enableRadio: {
  //   type: Boolean,
  //   default: true
  // },
  //影子进度条
  shadowProgress: {
    type: Boolean,
    default: true
  }
} as const)
export type VideoProps = ExtractPropTypes<typeof videoProps>

const isValidValue = (value: number) => isNumber(value)
export const videoEmits = {
  'update:modelValue': isValidValue,
  input: isValidValue,
  change: isValidValue
}
export type VideoEmits = typeof videoEmits

export type VideoInstance = InstanceType<typeof Video>

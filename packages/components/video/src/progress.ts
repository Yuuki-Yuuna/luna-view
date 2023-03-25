import { isNumber } from '@vueuse/core'
import { buildProps } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Progress from './progress.vue'

export const videoProgressProps = buildProps({
  allowControl: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Number,
    default: 0
  },
  buffered: {
    type: Number,
    default: 0
  }
} as const)
export type VideoProgressProps = ExtractPropTypes<typeof videoProgressProps>

export const videoProgressEmits = {
  'update:modelValue': (value: number) => isNumber(value)
}
export type VideoProgressEmits = typeof videoProgressEmits

export type VideoProgressInstance = InstanceType<typeof Progress>

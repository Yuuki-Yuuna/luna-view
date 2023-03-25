import { isNumber } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Button from './button.vue'

export const videoButtonProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  dragUpdater: {
    type: definePropType<(val: boolean) => void>(Function),
    required: true
  },
  progressWidth: {
    type: Number,
    required: true
  }
} as const)
export type VideoButtonProps = ExtractPropTypes<typeof videoButtonProps>

export const videoButtonEmits = {
  'update:modelValue': (value: number) => isNumber(value)
}
export type VideoButtonEmits = typeof videoButtonEmits

export type VideoButtonInstance = InstanceType<typeof Button>

import { isNumber } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type { Placement } from '@popperjs/core'
import type Button from './button.vue'

export interface SliderButtonDataState {
  hovering: boolean
  dragging: boolean
  isClick: boolean
  prevX: number
  currentX: number
  prevY: number
  currentY: number
  prevPosition: number //百分比
  newPosition: number //百分比
}

export const sliderButtonProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  vertical: {
    type: Boolean,
    default: false
  },
  tooltipClass: {
    type: String
  },
  placement: {
    type: definePropType<Placement>(String),
    default: 'top'
  },
  size: {
    type: definePropType<'default' | 'small' | 'large'>(String)
  },
  showButton: {
    type: Boolean,
    default: true
  }
} as const)
export type SliderButtonProps = ExtractPropTypes<typeof sliderButtonProps>

export const sliderButtonEmits = {
  ['update:modelValue']: (value: number) => isNumber(value)
}
export type SliderButtonEmits = typeof sliderButtonEmits

export type SliderButtonInstance = InstanceType<typeof Button>

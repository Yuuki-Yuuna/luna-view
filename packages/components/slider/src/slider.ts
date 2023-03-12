import { isNumber } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type { Placement } from '@popperjs/core'
import type Slider from './slider.vue'

export interface SliderDataState {
  dragging: boolean
  sliderSize: number
}

export const sliderProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  disabled: {
    type: Boolean,
    default: false
  },
  //按钮尺寸
  buttonSize: {
    type: definePropType<'default' | 'small' | 'large'>(String)
  },
  //显示按钮
  showButton: {
    type: Boolean,
    default: true
  },
  vertical: {
    type: Boolean,
    default: false
  },
  height: {
    type: String
  },
  showTooltip: {
    type: Boolean,
    default: true
  },
  tooltipClass: {
    type: String
  },
  placement: {
    type: definePropType<Placement>(String),
    default: 'top'
  }
} as const)
export type SliderProps = ExtractPropTypes<typeof sliderProps>

const isValidValue = (value: number) => isNumber(value)
export const sliderEmits = {
  'update:modelValue': isValidValue,
  input: isValidValue,
  change: isValidValue
}
export type SliderEmits = typeof sliderEmits

export type SliderInstance = InstanceType<typeof Slider>

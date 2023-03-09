import { isBoolean, isNumber, isString } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'
import { radioEmits } from './radio'

import type { ExtractPropTypes } from 'vue'
import type RadioGroup from './radio.vue'

export const radioGroupProps = buildProps({
  modelValue: {
    type: definePropType<string | number | boolean>([String, Number, Boolean]),
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: definePropType<'default' | 'small' | 'large'>(String)
  },
  name: {
    type: String
  }
} as const)
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits

export type RadioGroupInstance = InstanceType<typeof RadioGroup>

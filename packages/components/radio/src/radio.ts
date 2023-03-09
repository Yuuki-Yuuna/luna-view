import { isBoolean, isNumber, isString } from '@vueuse/core'
import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Radio from './radio.vue'

export const radioProps = buildProps({
  modelValue: {
    type: definePropType<string | number | boolean>([String, Number, Boolean]),
    default: ''
  },
  label: {
    type: definePropType<string | number | boolean>([String, Number, Boolean]),
    default: ''
  },
  size: {
    type: definePropType<'default' | 'small' | 'large'>(String)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  }
} as const)
export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  //组件使用v-model需要触发emit https://cn.vuejs.org/guide/components/v-model.html
  'update:modelValue': (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  change: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val)
}
export type RadioEmits = typeof radioEmits

export type RadioInstance = InstanceType<typeof Radio>

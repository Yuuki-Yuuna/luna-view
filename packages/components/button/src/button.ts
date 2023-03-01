import { buildProps, definePropType } from '@luna-view/utils'

import type { ButtonHTMLAttributes, ExtractPropTypes } from 'vue'

type ButtonSize = 'default' | 'large' | 'small'
type ButtonNativeType = NonNullable<ButtonHTMLAttributes['type']>

export const buttonProps = buildProps({
  size: {
    type: definePropType<ButtonSize>(String),
    validator(value: ButtonSize) {
      return (['default', 'large', 'small'] as const).includes(value)
    }
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  nativeType: {
    type: definePropType<ButtonNativeType>(String),
    default: 'button' as ButtonNativeType,
    validator(value: ButtonNativeType) {
      return (['button', 'submit', 'reset'] as const).includes(value)
    }
  }
} as const)
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

//有验证器的emits会被提示组件参数
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
export type ButtonEmits = typeof buttonEmits

import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes, StyleValue } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import type { ClassType } from '@luna-view/utils'
import type Content from './content.vue'

type PositionStrategy = 'fixed' | 'absolute'
type EffectMode = 'light' | 'dark'

// popper.js配置
export const popperCoreConfigProps = buildProps({
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: undefined
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: definePropType<Placement>(String),
    default: 'bottom'
  },
  strategy: {
    type: definePropType<PositionStrategy>(String),
    default: 'absolute'
  },
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({})
  }
} as const)
export type PopperCoreConfigProps = ExtractPropTypes<typeof popperCoreConfigProps>

export const popperContentProps = buildProps({
  ...popperCoreConfigProps,
  effect: {
    type: definePropType<EffectMode>(String),
    default: 'light'
  },
  enterable: {
    type: Boolean,
    default: true
  },
  popperClass: {
    type: definePropType<ClassType>([String, Array, Object]),
    default: ''
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object]),
    default: ''
  }
} as const)
export type PopperContentProps = ExtractPropTypes<typeof popperContentProps>

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent
}
export type PopperContentEmits = typeof popperContentEmits

export type PopperContentInstance = InstanceType<typeof Content>

import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Space from './space.vue'

type Algin = 'start' | 'center' | 'end'
type Size = 'small' | 'default' | 'large' | number | [number, number]

export const spaceProps = buildProps({
  alignment: {
    type: definePropType<Algin>(String),
    default: 'center'
  },
  direction: {
    type: definePropType<'vertical' | 'horizontal'>(String),
    default: 'horizontal'
  },
  gap: {
    type: definePropType<Size>([String, Array]),
    default: 'default'
  },
  wrap: {
    type: Boolean,
    default: false
  }
} as const)
export type SpaceProps = ExtractPropTypes<typeof spaceProps>

export type SpaceInstance = InstanceType<typeof Space>

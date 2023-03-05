import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Divider from './divider.vue'

export const dividerProps = buildProps({
  direction: {
    type: definePropType<'horizontal' | 'vertical'>(String),
    default: 'horizontal'
  },
  margin: {
    type: Number
  }
} as const)
export type DividerProps = ExtractPropTypes<typeof dividerProps>

export type DividerInstance = InstanceType<typeof Divider>

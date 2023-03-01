import { buildProps } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Arrow from './arrow.vue'

export const popperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
} as const)
export type PopperArrowProps = ExtractPropTypes<typeof popperArrowProps>

export type PopperArrowInstance = InstanceType<typeof Arrow>

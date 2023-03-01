import { buildProps, definePropType } from '@luna-view/utils'
import { tooltipEmits, tooltipProps } from '@luna-view/components'

import type { ExtractPropTypes } from 'vue'
import type Popover from './popover.vue'

export const popoverProps = buildProps({
  ...tooltipProps,
  title: {
    type: String
  },
  width: {
    type: definePropType<string | number>([String, Number]),
    default: 150
  }
} as const)
export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export const popoverEmits = tooltipEmits
export type PopoverEmits = typeof popoverEmits

export type PopoverInstance = InstanceType<typeof Popover>

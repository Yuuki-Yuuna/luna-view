import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export const tooltipTriggerProps = buildProps({
  disabled: {
    type: Boolean
  },
  trigger: {
    type: definePropType<TooltipTriggerType>(String),
    default: 'hover'
  },
  openStatus: {
    type: definePropType<boolean | undefined>(Boolean),
    default: undefined //传入时开关手动控制
  }
} as const)

export type TooltipTriggerProps = ExtractPropTypes<typeof tooltipTriggerProps>

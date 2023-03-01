import { buildProps } from '@luna-view/utils'
import { useDelayedToggleProps } from '@luna-view/hooks'
import { popperArrowProps } from '@luna-view/components/popper'
import { tooltipTriggerProps } from './trigger'
import { tooltipContentProps } from './content'

import type { ExtractPropTypes } from 'vue'
import type Tooltip from './tooltip.vue'

export const tooltipProps = buildProps({
  ...useDelayedToggleProps,
  ...tooltipTriggerProps,
  ...tooltipContentProps,
  ...popperArrowProps,
  showArrow: {
    type: Boolean,
    default: true
  }
} as const)

export const tooltipEmits = {
  'before-show': () => true,
  'before-hide': () => true,
  show: () => true,
  hide: () => true
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

export type TooltipInstance = InstanceType<typeof Tooltip>

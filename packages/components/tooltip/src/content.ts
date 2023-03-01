import { buildProps, definePropType } from '@luna-view/utils'
import { popperContentProps } from '@luna-view/components/popper'
import { useNamespace } from '@luna-view/hooks'

import type { ExtractPropTypes } from 'vue'

const ns = useNamespace('tooltip')

export const tooltipContentProps = buildProps({
  ...popperContentProps,
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object])
  },
  teleported: {
    type: Boolean,
    default: true
  },
  transition: {
    type: String,
    default: `${ns.namespace}-fade-in-linear`
  }
} as const)

export type TooltipContentProps = ExtractPropTypes<typeof tooltipContentProps>

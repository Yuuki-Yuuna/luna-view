import { buildProps, definePropType } from '@luna-view/utils'

import type Trigger from './trigger.vue'

export const popperTriggerProps = buildProps({
  onMouseEnter: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onMouseLeave: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onClick: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onFocus: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onBlur: {
    type: definePropType<(e: Event) => void>(Function)
  },
  onContextmenu: {
    type: definePropType<(e: Event) => void>(Function)
  }
} as const)

export type PopperTriggerProps = typeof popperTriggerProps

export type PopperTriggerInstance = InstanceType<typeof Trigger>

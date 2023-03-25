import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type ControlMenu from './control-menu.vue'

export const controlMenuProps = buildProps({
  currentTime: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
} as const)
export type ControlMenuProps = ExtractPropTypes<typeof ControlMenu>

export type ControlMenuInstance = InstanceType<typeof ControlMenu>

import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type TabPane from './tab-pane.vue'

export const tabPaneProps = buildProps({
  label: {
    type: String
  },
  name: {
    type: definePropType<string | number>([String, Number])
  },
  disabled: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean,
    default: false
  }
} as const)
export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export type TabPaneInstance = InstanceType<typeof TabPane>

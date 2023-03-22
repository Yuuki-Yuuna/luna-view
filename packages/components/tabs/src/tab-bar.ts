import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type { TabsPaneContext } from './tokens'
import type TabBar from './tab-bar.vue'

export const tabBarProps = buildProps({
  panes: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => [] as TabsPaneContext[]
  }
} as const)
export type TabBarProps = ExtractPropTypes<typeof tabBarProps>

export type TabBarInstance = InstanceType<typeof TabBar>

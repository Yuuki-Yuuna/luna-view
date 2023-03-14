import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type Badge from './badge.vue'

export type BadgeStatus = 'primary' | 'success' | 'warning' | 'info' | 'error' | 'danger'

export const badgeProps = buildProps({
  value: {
    type: definePropType<string | number>([String, Number]),
    default: ''
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  },
  type: {
    type: definePropType<BadgeStatus>(String),
    default: 'danger'
  }
} as const)
export type BadgeProps = ExtractPropTypes<typeof badgeProps>

export type BadgeInstance = InstanceType<typeof Badge>

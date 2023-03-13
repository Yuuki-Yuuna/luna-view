import { buildProps, definePropType } from '@luna-view/utils'
import { tooltipEmits, tooltipProps } from '@luna-view/components'
import { useNamespace } from '@luna-view/hooks'

import type { ExtractPropTypes } from 'vue'
import type Dropdown from './dropdown.vue'

export type DropdownSize = 'large' | 'small' | 'default'

const ns = useNamespace('dropdown')

export const dropdownProps = buildProps({
  ...tooltipProps,
  hideOnClick: {
    type: Boolean,
    default: true
  },
  size: {
    type: definePropType<DropdownSize>(String)
  },
  maxHeight: {
    type: definePropType<number | string>([Number, String]),
    default: ''
  },
  transition: {
    type: String,
    default: `${ns.namespace}-zoom-in-top`
  }
} as const)
export type DropdownProps = ExtractPropTypes<typeof dropdownProps>

export const dropdownEmits = {
  ...tooltipEmits
}
export type DropdownEmits = typeof dropdownEmits

export type DropdownInstance = InstanceType<typeof Dropdown>

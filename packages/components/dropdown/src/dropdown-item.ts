import { buildProps } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type DropdownItem from './dropdown-item.vue'

export const dropdownItemProps = buildProps({
  disabled: {
    type: Boolean
  }
} as const)
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>

export const dropdownItemEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
export type DropdownItemEmits = typeof dropdownItemEmits

export type DropdownItemInstance = InstanceType<typeof DropdownItem>

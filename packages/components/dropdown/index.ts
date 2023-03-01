import { withInstall, withNoopInstall } from '@luna-view/utils'

import Dropdown from './src/dropdown.vue'
import DropdownItem from './src/dropdown-item.vue'
import DropdownMenu from './src/dropdown-menu.vue'

export const LuDropdown = withInstall(Dropdown, {
  DropdownItem,
  DropdownMenu
})
export default LuDropdown

export const LuDropdownItem = withNoopInstall(DropdownItem)
export const LuDropdownMenu = withNoopInstall(DropdownMenu)

export * from './src/dropdown'

import {
  LuButton,
  LuCollapseTransition,
  LuDivider,
  LuDropdown,
  LuDropdownItem,
  LuDropdownMenu,
  LuPopover,
  LuRadio,
  LuRadioGroup,
  LuScrollbar,
  LuSlider,
  LuSpace,
  LuTooltip
} from '@luna-view/components'

import type { Plugin } from '@vue/runtime-core' //不加type打包报错, 主页不能从vue引入，类型不一致

export default [
  LuButton,
  LuCollapseTransition,
  LuDivider,
  LuDropdown,
  LuDropdownItem,
  LuDropdownMenu,
  LuPopover,
  LuScrollbar,
  LuSpace,
  LuTooltip,
  LuRadio,
  LuRadioGroup,
  LuSlider
] as Plugin[]

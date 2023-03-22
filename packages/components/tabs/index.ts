import { withInstall, withNoopInstall } from '@luna-view/utils'
import Tabs from './src/tabs'
import TabPane from './src/tab-pane.vue'

export const LuTabs = withInstall(Tabs, {
  TabPane
})
export const LuTabPane = withNoopInstall(TabPane)
export default LuTabs

export * from './src/tabs'
export * from './src/tab-bar'
export * from './src/tab-nav'
export * from './src/tab-pane'

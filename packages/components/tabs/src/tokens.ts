import type { TabsProps } from './tabs'
import type { TabPaneProps } from './tab-pane'
import type { InjectionKey, Ref, Slots, UnwrapRef } from 'vue'

// UnwrapRef去除包裹类型中所有的响应式类型(reactive响应式变量的类型与普通变量一致)
export type TabsPaneContext = UnwrapRef<{
  uid: number //用于查找VNode
  slots: Slots //自定义标头的插槽
  props: TabPaneProps //一些属性
  active: Ref<boolean> //是否激活
  index: Ref<string | undefined> //下标，默认name
}>

export interface TabsRootContext {
  props: TabsProps
  currentName: Ref<string | number>
  registerPane: (pane: TabsPaneContext) => void
  unregisterPane: (uid: number) => void
}

export const tabsRootContextKey: InjectionKey<TabsRootContext> = Symbol('tabsRootContextKey')

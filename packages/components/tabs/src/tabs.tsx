import { defineComponent, getCurrentInstance, nextTick, provide, ref, renderSlot, watch } from 'vue'
import { isNumber, isString } from '@vueuse/core'
import { useNamespace, useOrderedChildren } from '@luna-view/hooks'
import { buildProps, definePropType, isUndefined } from '@luna-view/utils'
import { tabsRootContextKey } from './tokens'
import TabNav from './tab-nav'

import type { ExtractPropTypes } from 'vue'
import type { Awaitable } from '@luna-view/utils'
import type { TabsPaneContext } from './tokens'

export type TabPaneName = string | number
export type TabPane = {
  name: TabPaneName
  label?: string
}

export const tabsProps = buildProps({
  modelValue: {
    type: definePropType<string | number>([String, Number])
  },
  tabPosition: {
    type: definePropType<'top' | 'right' | 'bottom' | 'left'>(String),
    default: 'top'
  },
  stretch: {
    type: Boolean,
    default: false
  },
  beforeChange: {
    type: definePropType<(newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>>(
      Function
    ),
    default: () => true
  }
} as const)
export type TabsProps = ExtractPropTypes<typeof tabsProps>

const isPaneName = (value: unknown): value is string | number => isString(value) || isNumber(value)

export const tabsEmits = {
  'update:modelValue': (paneName: TabPaneName) => isPaneName(paneName),
  tabChange: (name: TabPaneName) => isPaneName(name),
  tabClick: (pane: TabPane, ev: MouseEvent) => ev instanceof MouseEvent //已修改，没有暴露context出去
}
export type TabsEmits = typeof tabsEmits

export default defineComponent({
  name: 'LuTabs',
  props: tabsProps,
  emits: tabsEmits,
  setup(props, { emit, slots, expose }) {
    const navRef = ref<InstanceType<typeof TabNav>>()

    const ns = useNamespace('tabs')

    //注意panes是shallowRef，这会影响到tab-nav文件中参数的传递
    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane
    } = useOrderedChildren<TabsPaneContext>(getCurrentInstance()!, 'LuTabPane')

    const currentName = ref<TabPaneName>(props.modelValue ?? '0')

    const changeCurrentName = (value: TabPaneName) => {
      currentName.value = value
      emit('update:modelValue', value)
      emit('tabChange', value)
    }

    const setCurrentName = async (value?: TabPaneName) => {
      if (currentName.value === value || isUndefined(value)) {
        return
      }

      try {
        const canLeave = await props.beforeChange(value, currentName.value)
        if (canLeave !== false) {
          changeCurrentName(value)
        }
      } catch {
        // beforeLeave中promise使用reject时，防止报错
      }
    }

    const handleTabClick = (tab: TabsPaneContext, tabName: TabPaneName, event: MouseEvent) => {
      if (tab.props.disabled) {
        return
      }
      setCurrentName(tabName)
      emit('tabClick', { name: tabName, label: tab.props.label }, event)
    }

    watch(
      () => props.modelValue,
      (modelValue) => setCurrentName(modelValue)
    )

    watch(currentName, async () => {
      await nextTick()
      //ts不支持vue暴露
      ;(navRef.value as any)?.scrollToActiveTab()
    })

    provide(tabsRootContextKey, {
      props,
      currentName,
      registerPane,
      unregisterPane
    })

    expose({
      currentName
    })

    return () => {
      const header = (
        <div class={[ns.e('header'), ns.is(props.tabPosition)]}>
          <TabNav
            ref={navRef}
            currentName={currentName.value}
            panes={panes.value}
            tabPosition={props.tabPosition}
            stretch={props.stretch}
            onTabClick={handleTabClick}
          />
        </div>
      )

      const panels = <div class={ns.e('content')}>{renderSlot(slots, 'default')}</div>

      return (
        <div class={[ns.b(), ns.m(props.tabPosition)]}>
          {...props.tabPosition !== 'bottom' ? [header, panels] : [panels, header]}
        </div>
      )
    }
  }
})

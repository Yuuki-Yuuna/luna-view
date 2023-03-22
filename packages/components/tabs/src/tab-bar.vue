<template>
  <div
    ref="barRef"
    :class="[ns.e('active-bar'), ns.is(rootTabs.props.tabPosition)]"
    :style="barStyle"
  ></div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, nextTick, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { tabBarProps } from './tab-bar'
import { tabsRootContextKey } from './tokens'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuTabBar'
})

const props = defineProps(tabBarProps)

const instance = getCurrentInstance()!
const rootTabs = inject(tabsRootContextKey, undefined)!
const ns = useNamespace('tabs')

const barRef = ref<HTMLDivElement>()
const barStyle = ref<CSSProperties>()

const getBarStyle = (): CSSProperties => {
  let offset = 0 //偏移量
  let tabSize = 0 //宽度

  const sizeName = ['top', 'bottom'].includes(rootTabs.props.tabPosition) ? 'Width' : 'Height'
  const sizeDir = sizeName === 'Width' ? 'X' : 'Y'
  const position = sizeDir === 'X' ? 'Left' : 'Top'

  props.panes.forEach((pane) => {
    // refs中是没有被ref变量收集的dom
    const element = instance.parent?.refs?.[`tab-${pane.uid}`] as HTMLElement
    if (!element || !pane.active) {
      return
    }
    offset = element[`offset${position}`]
    tabSize = element[`client${sizeName}`]

    //getComputedStyle获取元素在浏览器中最终样式
    const tabStyles = window.getComputedStyle(element)
    //样式存在左右padding，但不存在上下padding
    if (sizeName === 'Width') {
      if (props.panes.length > 1) {
        // 中间元素具有左右padding
        tabSize -=
          Number.parseFloat(tabStyles.paddingLeft) + Number.parseFloat(tabStyles.paddingRight)
      }
      offset += Number.parseFloat(tabStyles.paddingLeft)
    }
  })

  return {
    [sizeName.toLowerCase()]: `${tabSize}px`,
    transform: `translate${sizeDir}(${offset}px)`
  }
}

const update = () => (barStyle.value = getBarStyle())

watch(
  () => props.panes,
  async () => {
    await nextTick()
    update()
  },
  { immediate: true }
)
useResizeObserver(barRef, () => update())

defineExpose({
  barRef,
  update
})
</script>

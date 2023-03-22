<template>
  <div v-if="shouldBeRender" v-show="active" :class="ns.b()">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useSlots,
  watch
} from 'vue'
import { eagerComputed } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { tabPaneProps } from './tab-pane'
import { tabsRootContextKey } from './tokens'

defineOptions({
  name: 'LuTabPane'
})

const props = defineProps(tabPaneProps)

const instance = getCurrentInstance()!
const slots = useSlots()
const tabsRoot = inject(tabsRootContextKey, undefined)!
const ns = useNamespace('tab-pane')

const index = ref<string>()
//依赖变更后立即计算
const active = eagerComputed(() => tabsRoot.currentName.value === (props.name ?? index.value))
const loaded = ref(active.value) //是否已经加载过
const shouldBeRender = eagerComputed(() => !props.lazy || loaded.value || active.value)

watch(active, (val) => {
  if (val) loaded.value = true
})

const pane = reactive({
  uid: instance.uid,
  slots,
  props,
  active,
  index
})

onMounted(() => {
  tabsRoot.registerPane(pane)
})

onUnmounted(() => {
  tabsRoot.unregisterPane(pane.uid)
})
</script>

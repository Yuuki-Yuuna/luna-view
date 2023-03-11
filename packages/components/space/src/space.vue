<template>
  <div :class="[spaceClass]" :style="spaceStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isNumber, isString } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { spaceProps } from './space'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuSpace'
})

const props = defineProps(spaceProps)

const spaceClass = computed(() => {
  const className = [ns.b(), ns.m(props.direction), ns.m(props.alignment)]
  if (isString(props.gap)) {
    className.push(ns.m(props.gap))
  }
  return className
})

const spaceStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (!isString(props.gap)) {
    // 第一位竖直，第二位水平
    style.gap = isNumber(props.gap)
      ? (style.gap = props.gap + 'px')
      : props.gap
          .map((item) => item + 'px')
          .toString()
          .replace(',', ' ')
  }
  style.flexWrap = props.wrap ? 'wrap' : 'nowrap'
  return style
})

const ns = useNamespace('space')
</script>

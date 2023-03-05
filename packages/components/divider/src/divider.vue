<template>
  <div :class="[ns.b(), ns.m(direction)]" :style="borderStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { dividerProps } from './divider'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuDivider'
})

const props = defineProps(dividerProps)

const borderStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.direction == 'horizontal') {
    style.marginTop = props.margin + 'px'
    style.marginBottom = props.margin + 'px'
  } else {
    style.marginLeft = props.margin + 'px'
    style.marginRight = props.margin + 'px'
  }
  return style
})

const ns = useNamespace('divider')
</script>

<template>
  <i :class="ns.b()" :style="style">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isNumber } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { iconProps } from './icon'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuIcon'
})

const props = defineProps(iconProps)

const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => ({
  fontSize: isNumber(props.size) ? `${props.size}px` : props.size,
  '--color': props.color
}))
</script>

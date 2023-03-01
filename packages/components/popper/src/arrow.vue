<template>
  <span ref="arrowRef" :class="ns.e('arrow')" data-popper-arrow></span>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, watch } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { popperArrowProps } from './arrow'
import { POPPER_CONTENT_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuPopperArrow'
})

const props = defineProps(popperArrowProps)

const ns = useNamespace('popper')
const { arrowRef, arrowOffset } = inject(POPPER_CONTENT_INJECTION_KEY)!

watch(
  () => props.arrowOffset,
  (val) => {
    arrowOffset.value = val
  }
)

onBeforeUnmount(() => {
  arrowOffset.value = undefined
})

defineExpose({
  arrowRef
})
</script>

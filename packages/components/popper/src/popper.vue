<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { POPPER_INJECTION_KEY } from './tokens'

import type { Instance as PopperInstance } from '@popperjs/core'
import type { PopperInjectionContext } from './tokens'

defineOptions({
  name: 'LuPopper'
})

const popperRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const popperInstanceRef = ref<PopperInstance>()

const popperProvides = {
  popperRef,
  triggerRef,
  contentRef,
  popperInstanceRef
} as PopperInjectionContext

defineExpose(popperProvides)

provide(POPPER_INJECTION_KEY, popperProvides)
</script>

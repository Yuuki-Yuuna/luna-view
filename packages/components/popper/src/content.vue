<template>
  <div
    ref="contentRef"
    :class="[ns.b(), ns.is(effect), popperClass]"
    :style="popperStyle"
    @mouseenter="(e) => $emit('mouseenter', e)"
    @mouseleave="(e) => $emit('mouseleave', e)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { popperContentEmits, popperContentProps } from './content'
import { usePopperContent } from './use-content'
import { POPPER_CONTENT_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuPopperContent'
})

const props = defineProps(popperContentProps)
const emit = defineEmits(popperContentEmits)

const ns = useNamespace('popper')
const { arrowRef, arrowOffset, contentRef, instanceRef, update } = usePopperContent(props)

const updatePopper = () => {
  update()
}

provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowRef,
  arrowOffset
})

defineExpose({
  popperContentRef: contentRef,
  popperInstanceRef: instanceRef,
  updatePopper
})
</script>

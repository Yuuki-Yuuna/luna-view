<template>
  <div
    ref="videoButtonRef"
    :class="ns.b()"
    :style="buttonStyle"
    @mousedown="onDragStart"
    @touchstart="onDragStart"
  >
    <div :class="ns.e('wrap')"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { videoButtonEmits, videoButtonProps } from './button'
import { videoInjectionKey } from './tokens'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuVideoButton'
})

const props = defineProps(videoButtonProps)
const emit = defineEmits(videoButtonEmits)

const videoButtonRef = ref<HTMLDivElement>()

const { emitChange } = inject(videoInjectionKey, undefined)!
const ns = useNamespace('video-button')
let prevPosition = 0
let isDrag = false

const buttonStyle = computed<CSSProperties>(() => ({
  left: `min(${props.modelValue}%`
}))

const setModelValue = (value: number) => {
  value = Math.min(Math.max(value, 0), 100)
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}

const onDragStart = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  prevPosition = getClientX(event)
  isDrag = true
  window.addEventListener('mousemove', onDragging)
  window.addEventListener('touchmove', onDragging)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchend', onDragEnd)
}

const onDragging = (event: MouseEvent | TouchEvent) => {
  if (!isDrag) {
    return
  }
  const position = getClientX(event)
  const diff = ((position - prevPosition) / props.progressWidth) * 100
  setModelValue(props.modelValue + diff)
  prevPosition = position
}

const onDragEnd = () => {
  if (!isDrag) {
    return
  }
  isDrag = false
  emitChange()
  window.removeEventListener('mousemove', onDragging)
  window.removeEventListener('touchmove', onDragging)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchend', onDragEnd)
}

const getClientX = (event: MouseEvent | TouchEvent) => {
  return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
}

defineExpose({
  setModelValue,
  onDragStart
})
</script>

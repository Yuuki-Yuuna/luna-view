<template>
  <div
    :class="ns.b()"
    @touchstart="(e) => e.preventDefault()"
    @touchmove="(e) => e.preventDefault()"
  >
    <div
      ref="scheduleRef"
      :class="ns.e('schedule')"
      @mousedown="onProgressDown"
      @touchstart="onProgressDown"
    >
      <div :class="ns.e('buffer')" :style="bufferdStyle"></div>
      <div :class="ns.e('current')" :style="currentStyle"></div>
      <lu-video-button
        v-if="allowControl"
        ref="videoButtonRef"
        v-model="modelValue"
        :drag-updater="updateDrag"
        :progress-width="progressWidth"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, unref, watch } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { videoProgressEmits, videoProgressProps } from './progress'
import { videoInjectionKey } from './tokens'
import LuVideoButton from './button.vue'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuVideoProgress'
})

const props = defineProps(videoProgressProps)
const emit = defineEmits(videoProgressEmits)

const scheduleRef = ref<HTMLDivElement>()
const videoButtonRef = ref<InstanceType<typeof LuVideoButton>>()

const { videoRef, play } = inject(videoInjectionKey, undefined)!
const ns = useNamespace('video-progress')
const isDrag = ref(false)
let playStatus = true //拖动后是否播放

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
const progressWidth = ref(0)

const bufferdStyle = computed<CSSProperties>(() => ({
  width: `${props.buffered}%`
}))

const currentStyle = computed<CSSProperties>(() => ({
  width: `${props.modelValue}%`
}))

const setPercentage = (position: number) => {
  const startPosition = scheduleRef.value!.getBoundingClientRect().left
  progressWidth.value = scheduleRef.value!.getBoundingClientRect().width
  const newPercentage = ((position - startPosition) / progressWidth.value) * 100
  videoButtonRef.value?.setModelValue(newPercentage)
}

const onProgressDown = (event: MouseEvent | TouchEvent) => {
  if (isDrag.value || !props.allowControl) {
    return
  }
  const position = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
  setPercentage(position)
  videoButtonRef.value?.onDragStart(event)
}

const updateDrag = (value: boolean) => {
  isDrag.value = value
}

watch(isDrag, (val) => {
  const video = unref(videoRef)
  if (!video) {
    return
  } else {
    if (val) {
      playStatus = !video.paused
      video.pause()
    } else {
      playStatus && play()
    }
  }
})
</script>

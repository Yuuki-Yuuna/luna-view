<template>
  <div
    ref="containerRef"
    :class="ns.b()"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <video
      ref="videoRef"
      :class="ns.e('player')"
      :style="videoStyle"
      :src="src"
      @loadstart="onLoadStart"
      @loadedmetadata="onLoadedMeta"
      @timeupdate="onTimeUpdate"
      @play="onVideoPlay"
      @pause="onVideoPause"
      @click="play"
    />
    <div v-show="isReady" :class="ns.e('controls')" :style="controlStyle">
      <div :class="ns.e('control-wrap')">
        <lu-video-progress v-model="modelValue" :buffered="bufferPercentage" allow-control />
        <lu-video-control-menu :current-time="currentTime" :duration="duration" />
      </div>
    </div>
    <div v-show="isReady && shadowProgress && hideControl" :class="ns.e('shadow-progress-wrap')">
      <lu-video-progress v-model="modelValue" :buffered="bufferPercentage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, unref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { LuMessage } from '@luna-view/components/message'
import { videoEmits, videoProps } from './video'
import { videoInjectionKey } from './tokens'
import LuVideoProgress from './progress.vue'
import LuVideoControlMenu from './control-menu.vue'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuVideo'
})

const props = defineProps(videoProps)
const emit = defineEmits(videoEmits)

const containerRef = ref<HTMLDivElement>()
const videoRef = ref<HTMLVideoElement>()

const ns = useNamespace('video')

const modelValue = computed({
  get() {
    return Math.min(Math.max(props.modelValue, 0), 100)
  },
  set(val) {
    emit('update:modelValue', val)
    emit('input', val)
    const video = unref(videoRef)
    if (video) {
      video.currentTime = (video.duration * val) / 100
      currentTime.value = video.currentTime
    }
  }
})

let stopHideCursorTimer: (() => void) | undefined = undefined

const hideCursor = ref(false)
const hideControl = ref(true)
const bufferPercentage = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)
const isReady = ref(false)

const videoStyle = computed<CSSProperties>(() => ({
  cursor: hideCursor.value ? 'none' : 'default'
}))
const controlStyle = computed<CSSProperties>(() => ({
  opacity: hideControl.value ? 0 : 1
}))

const play = async () => {
  const video = unref(videoRef)
  if (!video) {
    return
  }
  if (video.paused) {
    try {
      await video.play()
    } catch (err) {
      LuMessage.error('播放失败')
    }
  } else {
    video.pause()
  }
}

const onVideoPlay = () => {
  isPlaying.value = true
}

const onVideoPause = () => {
  isPlaying.value = false
}

const onLoadStart = () => {
  isReady.value = false
}

// //元数据包含: 时长，尺寸大小（视频），文本轨道
const onLoadedMeta = () => {
  const video = unref(videoRef)!
  duration.value = video.duration
  video.currentTime = (video.duration * modelValue.value) / 100
  isReady.value = true
}

const emitChange = () => {
  emit('change', modelValue.value)
}

provide(videoInjectionKey, {
  containerRef,
  videoRef,
  isPlaying,
  play,
  emitChange
})

const onTimeUpdate = () => {
  const video = unref(videoRef)
  if (!video) {
    return
  }
  currentTime.value = video.currentTime
  const newPercentage = (video.currentTime / video.duration) * 100
  bufferPercentage.value = (video.buffered.end(0) / video.duration) * 100
  emit('update:modelValue', newPercentage)
}

const startTimer = () => {
  const { start, stop } = useTimeoutFn(() => {
    hideCursor.value = true
    hideControl.value = true
  }, 2000)
  stopHideCursorTimer = stop
  start()
}

const onMouseEnter = () => {
  startTimer()
}

const onMouseMove = () => {
  stopHideCursorTimer?.()
  hideCursor.value = false
  hideControl.value = false
  startTimer()
}

const onMouseLeave = () => {
  stopHideCursorTimer?.()
  hideCursor.value = false
  hideControl.value = true
}

defineExpose({
  videoRef,
  play
})
</script>

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
    <div :class="ns.e('controls')" :style="controlStyle">
      <div :class="ns.e('control-wrap')">
        <lu-video-progress v-model="modelValue" :buffered="bufferPercentage" allow-control />
        <div :class="ns.e('control-menu')">
          <div :class="[ns.e('control-item'), ns.e('control-play')]" @click="play">
            <lu-icon v-if="isPlaying"><Pause /></lu-icon>
            <lu-icon v-else><Play /></lu-icon>
          </div>
          <div :class="[ns.e('control-item'), ns.e('control-time')]">
            <span>{{ formatTime(currentTime) }}</span>
            <span style="margin: 0 5px">/</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
          <div :class="[ns.e('control-item'), ns.e('control-flex')]"></div>
          <lu-tooltip
            ref="volumeTooltip"
            effect="dark"
            placement="top"
            :show-arrow="false"
            :append-to="containerRef"
          >
            <div :class="[ns.e('control-item'), ns.e('control-volume')]">
              <lu-icon v-if="volume"><Volume /></lu-icon>
              <lu-icon v-else><Mute /></lu-icon>
            </div>
            <template #content>
              <div :class="ns.e('volume')">{{ volume }}</div>
              <lu-slider
                v-model="volume"
                vertical
                height="80px"
                :show-button="false"
                :show-tooltip="false"
                @input="onVolumeChange"
              />
            </template>
          </lu-tooltip>
          <div :class="[ns.e('control-item'), ns.e('control-pip')]" @click="setPictureInPicture">
            <lu-icon><PictureInPicture /></lu-icon>
          </div>
          <div :class="[ns.e('control-item'), ns.e('control-fullscreen')]" @click="setFullscreen">
            <lu-icon><Fullscreen /></lu-icon>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isReady && shadowProgress && hideControl" :class="ns.e('shadow-progress-wrap')">
      <lu-video-progress v-model="modelValue" :buffered="bufferPercentage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, unref } from 'vue'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { isUndefined } from '@luna-view/utils'
import { LuTooltip } from '@luna-view/components/tooltip'
import { LuSlider } from '@luna-view/components/slider'
import { LuMessage } from '@luna-view/components/message'
import { LuIcon } from '@luna-view/components/icon'
import { videoEmits, videoProps } from './video'
import { videoInjectionKey } from './tokens'
import LuVideoProgress from './progress.vue'
import Icons from './icons'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuVideo'
})

const { Play, Pause, Volume, Mute, PictureInPicture, Fullscreen } = Icons

const props = defineProps(videoProps)
const emit = defineEmits(videoEmits)

const containerRef = ref<HTMLDivElement>()
const videoRef = ref<HTMLVideoElement>()
const volumeTooltip = ref<InstanceType<typeof LuTooltip>>()

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
const volume = ref(60)
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

const setFullscreen = async () => {
  const container = unref(containerRef)!
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    try {
      await container.requestFullscreen()
    } catch {
      LuMessage.error('全屏播放错误')
    }
  }
}

const onVolumeChange = (value: number) => {
  const video = unref(videoRef)
  if (!video) {
    return
  }
  video.volume = value / 100
}

const setPictureInPicture = async () => {
  const video = unref(videoRef)
  if (!video) {
    return
  }
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture()
  } else {
    try {
      await video.requestPictureInPicture()
    } catch (err) {
      LuMessage.error('画中画模式播放错误')
    }
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

const formatTime = (value?: number) => {
  if (isUndefined(value) || isNaN(value)) {
    return '00:00'
  }
  let h = Math.floor(value / 3600)
  let m = Math.floor((value / 60) % 60)
  let s = Math.floor(value % 60)
  const transform = (n: number) => {
    return (n < 10 ? '0' : '') + n
  }
  return `${h ? `${transform(h)}:` : ''}${transform(m)}:${transform(s)}`
}

const emitChange = () => {
  emit('change', modelValue.value)
}

provide(videoInjectionKey, {
  videoRef,
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

useResizeObserver(containerRef, () => {
  volumeTooltip.value?.updatePopper()
})

defineExpose({
  videoRef,
  play
})
</script>

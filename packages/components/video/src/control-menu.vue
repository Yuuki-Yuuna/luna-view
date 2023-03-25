<template>
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
</template>

<script setup lang="ts">
import { inject, ref, unref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { isUndefined } from '@luna-view/utils'
import { LuTooltip } from '@luna-view/components/tooltip'
import { LuMessage } from '@luna-view/components/message'
import { LuSlider } from '@luna-view/components/slider'
import { LuIcon } from '@luna-view/components/icon'
import { controlMenuProps } from './control-menu'
import { videoInjectionKey } from './tokens'
import Icons from './icons'

defineOptions({
  name: 'LuVideoControlMenu'
})

const { Play, Pause, Volume, Mute, PictureInPicture, Fullscreen } = Icons

const props = defineProps(controlMenuProps)

const volumeTooltip = ref<any>() //使用InstanceType<typeof LuTooltip>会报过长，麻了

const { containerRef, videoRef, isPlaying, play } = inject(videoInjectionKey, undefined)!
const ns = useNamespace('video')

const volume = ref(60)

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

useResizeObserver(containerRef, () => {
  volumeTooltip.value?.updatePopper()
})
</script>

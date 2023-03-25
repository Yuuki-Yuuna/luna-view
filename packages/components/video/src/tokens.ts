import type { InjectionKey, Ref } from 'vue'

export type VideoInjection = {
  containerRef: Ref<HTMLDivElement | undefined>
  videoRef: Ref<HTMLVideoElement | undefined>
  isPlaying: Ref<Boolean>
  play: () => Promise<void>
  emitChange: () => void
}

export const videoInjectionKey: InjectionKey<VideoInjection> = Symbol('video')

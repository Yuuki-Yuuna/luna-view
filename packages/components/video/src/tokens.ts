import type { InjectionKey, Ref } from 'vue'

export type VideoInjection = {
  videoRef: Ref<HTMLVideoElement | undefined>
  play: () => Promise<void>
  emitChange: () => void
}

export const videoInjectionKey: InjectionKey<VideoInjection> = Symbol('video')

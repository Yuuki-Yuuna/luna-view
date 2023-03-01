import type { InjectionKey, Ref } from 'vue'

export interface ScrollbarInjectionContext {
  scrollbarRef: Ref<HTMLDivElement | undefined>
  wrapRef: Ref<HTMLDivElement | undefined>
  smooth: Ref<boolean>
}

export const SCROLLBAR_INJECTION_KEY: InjectionKey<ScrollbarInjectionContext> = Symbol('scrollbar')

import type { InjectionKey, Ref } from 'vue'
import type { Instance } from '@popperjs/core'

export type PopperInjectionContext = {
  popperRef: Ref<HTMLElement | undefined>
  triggerRef: Ref<HTMLElement | undefined>
  contentRef: Ref<HTMLElement | undefined>
  popperInstanceRef: Ref<Instance | undefined>
}

export type PopperContentInjectionContext = {
  arrowRef: Ref<HTMLElement | undefined>
  arrowOffset: Ref<number | undefined>
}

export const POPPER_INJECTION_KEY: InjectionKey<PopperInjectionContext> = Symbol('popper')

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<PopperContentInjectionContext> =
  Symbol('popperContent')

import type { InjectionKey, Ref } from 'vue'
import type { TooltipTriggerType } from './trigger'

export type TooltipInjectionContext = {
  controlled: Ref<boolean>
  open: Ref<boolean>
  trigger: Ref<TooltipTriggerType>
  onOpen: (e?: Event) => void
  onClose: (e?: Event) => void
  onToggle: (e: Event) => void
  onBeforeShow: () => void
  onBeforeHide: () => void
  onShow: () => void
  onHide: () => void
  updatePopper: () => void
}

export const TOOLTIP_INJECTION_KEY: InjectionKey<TooltipInjectionContext> = Symbol('tooltip')

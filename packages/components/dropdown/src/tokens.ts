import type { InjectionKey, Ref } from 'vue'
import type { DropdownSize } from './dropdown'

export type DropdownInjectionContext = {
  size: Ref<DropdownSize>
  hideOnClick: Ref<boolean>
  handleClick: () => void
}

export const DROPDOWN_INJECTION_KEY: InjectionKey<DropdownInjectionContext> = Symbol('dropdown')

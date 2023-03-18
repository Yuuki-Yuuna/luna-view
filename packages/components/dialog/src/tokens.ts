import type { CSSProperties, InjectionKey, Ref } from 'vue'

export type DialogContext = {
  dialogRef: Ref<HTMLElement | undefined>
  style: Ref<CSSProperties>
}

export const dialogInjectionKey: InjectionKey<DialogContext> = Symbol('dialogInjectionKey')

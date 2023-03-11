import type { InjectionKey, Ref } from 'vue'

export interface SliderInjection {
  disabled: Ref<boolean>
  showTooltip: Ref<Boolean>
  max: Ref<number>
  min: Ref<number>
  sliderSize: Ref<number>
  resetSize: () => void
  updateDragging: (val: boolean) => void
  emitChange: () => void
}

export const sliderInjectionKey: InjectionKey<SliderInjection> = Symbol('slider')

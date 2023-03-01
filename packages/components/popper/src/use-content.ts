import { computed, inject, onMounted, ref, unref, watch } from 'vue'
import { usePopper } from './use-popper'
import { POPPER_INJECTION_KEY } from './tokens'
import { buildPopperOptions } from './util'

import type { ArrowModifier } from '@popperjs/core/lib/modifiers/arrow'
import type { PartialOptions } from './use-popper'
import type { PopperContentProps } from './content'

export const usePopperContent = (props: PopperContentProps) => {
  const { popperInstanceRef, contentRef, triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!

  const arrowRef = ref<HTMLElement>()
  const arrowOffset = ref<number>()

  const arrowModifier = computed(() => {
    const arrowEl = unref(arrowRef)
    const offset = unref(arrowOffset) ?? 0

    return {
      name: 'arrow',
      options: {
        element: arrowEl,
        padding: offset
      }
    } as ArrowModifier
  })

  const options = computed<PartialOptions>(() => {
    return {
      ...buildPopperOptions(props, [unref(arrowModifier)])
    }
  })

  const { update, forceUpdate, instanceRef } = usePopper(triggerRef, contentRef, options)

  watch(instanceRef, (instance) => (popperInstanceRef.value = instance))

  onMounted(() => {
    watch(
      () => unref(triggerRef)?.getBoundingClientRect(),
      () => update()
    )
  })

  return {
    arrowRef,
    arrowOffset,
    contentRef,
    instanceRef,
    forceUpdate,
    update
  }
}

export type UsePopperContentReturn = ReturnType<typeof usePopperContent>

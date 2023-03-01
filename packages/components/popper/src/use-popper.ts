import { computed, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'
import { createPopper } from '@popperjs/core'

import type { Ref } from 'vue'
import type { Instance, Options } from '@popperjs/core'

type ElementType = HTMLElement | undefined
export type PartialOptions = Partial<Options>

// popper.js构造函数的vue封装
export const usePopper = (
  referenceElementRef: Ref<ElementType>,
  popperElementRef: Ref<ElementType>,
  opts: Ref<PartialOptions> = ref({})
) => {
  const options = computed<Options>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts)

    return {
      onFirstUpdate,
      placement: placement || 'bottom',
      strategy: strategy || 'absolute',
      modifiers: [...(modifiers || [])]
    }
  })

  const instanceRef = shallowRef<Instance>()

  const destroy = () => {
    if (!instanceRef.value) {
      return
    }

    instanceRef.value.destroy()
    instanceRef.value = undefined
  }

  watch(
    options,
    (newOptions) => {
      const instance = unref(instanceRef)
      if (instance) {
        instance.setOptions(newOptions)
      }
    },
    {
      deep: true
    }
  )

  watch([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
    destroy()
    if (!referenceElement || !popperElement) {
      return
    }

    instanceRef.value = createPopper(referenceElement, popperElement, unref(options))
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    state: computed(() => ({ ...(unref(instanceRef)?.state || {}) })),
    update: () => unref(instanceRef)?.update(),
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    instanceRef: computed(() => unref(instanceRef))
  }
}

<template>
  <lu-only-child>
    <slot />
  </lu-only-child>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue'
import { LuOnlyChild } from '@luna-view/components/slot'
import { useForwardRef } from '@luna-view/hooks'
import { isElement } from '@luna-view/utils'
import { popperTriggerProps } from './trigger'
import { POPPER_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuPopperTrigger'
})

const props = defineProps(popperTriggerProps)

const { triggerRef } = inject(POPPER_INJECTION_KEY)!

useForwardRef(triggerRef)

watch(triggerRef, (el, prevEl) => {
  if (isElement(el)) {
    ;(
      ['onMouseEnter', 'onMouseLeave', 'onClick', 'onFocus', 'onBlur', 'onContextmenu'] as const
    ).forEach((eventName) => {
      const handler = props[eventName]
      if (handler) {
        el.addEventListener(eventName.slice(2).toLowerCase(), handler)
        prevEl?.removeEventListener?.(eventName.slice(2).toLowerCase(), handler)
      }
    })
  }
})

defineExpose({
  triggerRef
})
</script>

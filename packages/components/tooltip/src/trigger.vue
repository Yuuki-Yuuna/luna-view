<template>
  <lu-popper-trigger
    :class="ns.e('trigger')"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    @contextmenu="onContextmenu"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </lu-popper-trigger>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { LuPopperTrigger } from '@luna-view/components/popper'
import { useNamespace } from '@luna-view/hooks'
import { tooltipTriggerProps } from './trigger'
import { TOOLTIP_INJECTION_KEY } from './tokens'

import type { TooltipTriggerType } from './trigger'

defineOptions({
  name: 'LuTooltipTrigger'
})

const props = defineProps(tooltipTriggerProps)

const ns = useNamespace('tooltip')
const { onOpen, onClose, onToggle } = inject(TOOLTIP_INJECTION_KEY)!

const addEventHandler = (type: TooltipTriggerType, handler: (e: Event) => void) => {
  const eventHandler = (e: Event) => {
    if (props.disabled || props.trigger != type) {
      return
    }
    if (type == 'contextmenu') {
      e.preventDefault()
    }
    handler(e)
  }

  return eventHandler
}

const onMouseEnter = addEventHandler('hover', onOpen)

const onMouseLeave = addEventHandler('hover', onClose)

const onClick = addEventHandler('click', onToggle)

const onContextmenu = addEventHandler('contextmenu', onToggle)

const onFocus = addEventHandler('focus', onOpen)

const onBlur = addEventHandler('focus', onClose)
</script>

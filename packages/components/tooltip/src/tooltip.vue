<template>
  <lu-popper ref="popperRef">
    <lu-tooltip-trigger :disabled="disabled" :trigger="trigger" :open-status="openStatus">
      <slot />
    </lu-tooltip-trigger>
    <lu-tooltip-content
      ref="contentRef"
      :fallback-placements="fallbackPlacements"
      :offset="offset"
      :placement="placement"
      :strategy="strategy"
      :popper-options="popperOptions"
      :effect="effect"
      :enterable="enterable"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :teleported="teleported"
      :append-to="appendTo"
      :transition="transition"
    >
      <slot name="content" />
      <lu-popper-arrow v-if="showArrow" :arrow-offset="arrowOffset"></lu-popper-arrow>
    </lu-tooltip-content>
  </lu-popper>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRef, unref } from 'vue'
import { isBoolean } from '@vueuse/core'
import { LuPopper, LuPopperArrow } from '@luna-view/components/popper'
import { useDelayedToggle, usePopperContainer } from '@luna-view/hooks'
import LuTooltipTrigger from './trigger.vue'
import LuTooltipContent from './content.vue'
import { tooltipEmits, tooltipProps } from './tooltip'
import { TOOLTIP_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuTooltip'
})

const props = defineProps(tooltipProps)
const emit = defineEmits(tooltipEmits)

usePopperContainer()

const popperRef = ref<InstanceType<typeof LuPopper>>()
const contentRef = ref<InstanceType<typeof LuTooltipContent>>()

const open = ref(false)

const controlled = computed(() => {
  if (props.disabled) {
    return false
  } else {
    return isBoolean(props.openStatus) ? props.openStatus : unref(open)
  }
})

const { onOpen, onClose } = useDelayedToggle({
  showAfter: toRef(props, 'showAfter'),
  hideAfter: toRef(props, 'hideAfter'),
  open: () => (open.value = true),
  close: () => (open.value = false)
})

const updatePopper = () => {
  const popper = unref(popperRef)
  if (popper) {
    popper.popperInstanceRef?.update()
  }
}

provide(TOOLTIP_INJECTION_KEY, {
  controlled,
  open,
  trigger: toRef(props, 'trigger'),
  onOpen,
  onClose,
  onToggle: (event?: Event) => {
    if (unref(open)) {
      onClose(event)
    } else {
      onOpen(event)
    }
  },
  onBeforeShow: () => {
    emit('before-show')
  },
  onBeforeHide: () => {
    emit('before-hide')
  },
  onShow: () => {
    emit('show')
  },
  onHide: () => {
    emit('hide')
  },
  updatePopper
})

defineExpose({
  popperRef,
  contentRef,
  updatePopper,
  onOpen,
  onClose
})
</script>

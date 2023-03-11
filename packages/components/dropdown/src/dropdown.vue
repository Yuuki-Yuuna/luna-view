<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]">
    <lu-tooltip
      ref="tooltipRef"
      :show-arrow="showArrow"
      :disabled="disabled"
      :trigger="trigger"
      :open-status="openStatus"
      :fallback-placements="fallbackPlacements"
      :offset="offset"
      :placement="placement"
      :strategy="strategy"
      :popper-options="popperOptions"
      :effect="effect"
      :enterable="enterable"
      :popper-class="[ns.e('popper'), popperClass]"
      :popper-style="popperStyle"
      :teleported="teleported"
      :append-to="appendTo"
      :transition="transition"
      @before-show="onBeforeShow"
      @before-hide="onBeforeHide"
      @show="onShow"
      @hide="onHide"
    >
      <slot />
      <template #content>
        <lu-scrollbar
          ref="scrollbarRef"
          tag="div"
          :view-class="ns.e('list')"
          :max-height="maxHeight"
        >
          <slot name="dropdown" />
        </lu-scrollbar>
      </template>
    </lu-tooltip>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, toRef } from 'vue'
import { LuScrollbar } from '@luna-view/components/scrollbar'
import { LuTooltip } from '@luna-view/components/tooltip'
import { useNamespace } from '@luna-view/hooks'
import { dropdownEmits, dropdownProps } from './dropdown'
import { DROPDOWN_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuDropdown'
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmits)

const tooltipRef = ref<InstanceType<typeof LuTooltip>>()
const scrollbarRef = ref<InstanceType<typeof LuScrollbar>>()

const ns = useNamespace('dropdown')

const handleClose = () => {
  tooltipRef.value?.onClose()
}

const handleOpen = () => {
  tooltipRef.value?.onOpen()
}

const handleClick = () => {
  handleClose()
}

const onBeforeShow = () => {
  emit('before-show')
}

const onBeforeHide = () => {
  emit('before-hide')
}

const onShow = () => {
  emit('show')
}

const onHide = () => {
  emit('hide')
}

provide(DROPDOWN_INJECTION_KEY, {
  size: toRef(props, 'size'),
  hideOnClick: toRef(props, 'hideOnClick'),
  handleClick
})

defineExpose({
  tooltipRef,
  scrollbarRef,
  handleOpen,
  handleClose
})
</script>

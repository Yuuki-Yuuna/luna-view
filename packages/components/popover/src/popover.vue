<template>
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
    :popper-class="className"
    :popper-style="style"
    :teleported="teleported"
    :append-to="appendTo"
    :transition="transition"
    @before-show="onBeforeShow"
    @show="onShow"
    @before-hide="onBeforeHide"
    @hide="onHide"
  >
    <slot name="reference" />
    <template #content>
      <div v-if="title" :class="ns.e('title')">
        {{ title }}
      </div>
      <slot />
    </template>
  </lu-tooltip>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { LuTooltip } from '@luna-view/components'
import { useNamespace } from '@luna-view/hooks'
import { popoverEmits, popoverProps } from './popover'

defineOptions({
  name: 'LuPopover'
})

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

const tooltipRef = ref<InstanceType<typeof LuTooltip>>()
const popperRef = computed(() => unref(tooltipRef)?.popperRef)

const ns = useNamespace('popover')
const style = computed(() => [{ width: props.width }, props.popperStyle])
const className = computed(() => [ns.b(), props.popperClass])

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

defineExpose({
  popperRef
})
</script>

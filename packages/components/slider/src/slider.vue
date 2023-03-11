<template>
  <div
    ref="sliderWrapperRef"
    :class="[ns.b(), ns.is('vertical', vertical)]"
    @touchstart="(e) => e.preventDefault()"
    @touchmove="(e) => e.preventDefault()"
  >
    <div
      ref="sliderRef"
      :class="[ns.e('runway'), ns.is('disabled', disabled)]"
      :style="runwayStyle"
      @mousedown="onSliderDown"
      @touchstart="onSliderDown"
    >
      <div :class="ns.e('bar')" :style="barStyle"></div>
      <lu-slider-button
        ref="silderButtonRef"
        v-model="modelValue"
        :vertical="vertical"
        :tooltip-class="tooltipClass"
        :placement="placement"
        :show-button="showButton"
        :size="buttonSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, reactive, ref, toRef } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import LuSliderButton from './button.vue'
import { sliderEmits, sliderProps } from './slider'
import { sliderInjectionKey } from './tokens'

import type { CSSProperties } from 'vue'
import type { SliderDataState } from './slider'

defineOptions({
  name: 'LuSlider'
})

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const sliderWrapperRef = ref<HTMLDivElement>()
const sliderRef = ref<HTMLDivElement>()
const silderButtonRef = ref<InstanceType<typeof LuSliderButton>>()

const ns = useNamespace('slider')

const dataState = reactive<SliderDataState>({
  dragging: false,
  sliderSize: 1 //slider的实际宽度或高度
})

const min = computed(() => (props.max > props.min ? props.min : 0))
const max = computed(() => (props.max > props.min ? props.max : 100))
const modelValue = computed({
  get() {
    return Math.max(Math.min(props.modelValue, max.value), min.value)
  },
  set(val) {
    emit('update:modelValue', val)
    emit('input', val)
    // change事件交button组件更新
  }
})

const barPercentage = computed(
  () => ((modelValue.value - min.value) / (max.value - min.value)) * 100 + '%'
)
const runwayStyle = computed<CSSProperties>(() =>
  props.vertical ? { height: props.height + 'px' } : {}
)
const barStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = props.vertical
    ? { height: barPercentage.value, bottom: 0 }
    : { width: barPercentage.value, left: 0 }
  if (!props.showButton && modelValue.value === max.value) {
    style.borderRadius = '3px'
  }
  return style
})

const resetSize = () => {
  if (sliderRef.value) {
    dataState.sliderSize = sliderRef.value[`client${props.vertical ? 'Height' : 'Width'}`]
  }
}

const setSliderPointer = (e: MouseEvent | TouchEvent) => {
  if (props.disabled || dataState.dragging) {
    return
  }
  resetSize()
  let newPercent = 0
  if (props.vertical) {
    const clientY = (e as TouchEvent).touches?.item(0)?.clientY ?? (e as MouseEvent).clientY
    const sliderOffsetBottom = sliderRef.value!.getBoundingClientRect().bottom
    newPercent = ((sliderOffsetBottom - clientY) / dataState.sliderSize) * 100
  } else {
    const clientX = (e as TouchEvent).touches?.item(0)?.clientX ?? (e as MouseEvent).clientX
    const sliderOffsetLeft = sliderRef.value!.getBoundingClientRect().left
    newPercent = ((clientX - sliderOffsetLeft) / dataState.sliderSize) * 100
  }
  silderButtonRef.value?.setPosition(newPercent)
}

const onSliderDown = (e: MouseEvent | TouchEvent) => {
  setSliderPointer(e)
  nextTick(() => silderButtonRef.value?.onButtonDown(e))
}

const updateDragging = (val: boolean) => {
  dataState.dragging = val
}

const emitChange = () => {
  emit('change', modelValue.value)
}

provide(sliderInjectionKey, {
  disabled: toRef(props, 'disabled'),
  showTooltip: toRef(props, 'showTooltip'),
  sliderSize: toRef(dataState, 'sliderSize'),
  max,
  min,
  resetSize,
  updateDragging,
  emitChange
})
</script>

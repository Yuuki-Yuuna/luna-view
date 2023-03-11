<template>
  <div
    ref="sliderButtonRef"
    :class="[ns.e('button-wrapper'), { dragging }]"
    :style="wrapperStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
  >
    <lu-tooltip
      ref="tooltipRef"
      effect="dark"
      :disabled="!showTooltip"
      :placement="placement"
      :fallback-placements="['top', 'bottom', 'right', 'left']"
      :popper-class="tooltipClass"
      :open-status="tooltipOpen"
    >
      <div
        :class="[ns.e('button'), ns.em('button', size), { dragging: dragging }]"
        :style="buttonStyle"
      ></div>
      <template #content>
        <span>{{ modelValue }}</span>
      </template>
    </lu-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, reactive, ref, toRefs, watch } from 'vue'
import { LuTooltip } from '@luna-view/components/tooltip' //必须要详细路径不然导致循环引用热更新报错
import { useNamespace } from '@luna-view/hooks'
import { sliderButtonEmits, sliderButtonProps } from './button'
import { sliderInjectionKey } from './tokens'

import type { CSSProperties } from 'vue'
import type { SliderButtonDataState } from './button'

defineOptions({
  name: 'LuSliderButton'
})

const props = defineProps(sliderButtonProps)
const emit = defineEmits(sliderButtonEmits)

const sliderButtonRef = ref<HTMLDivElement>()
const tooltipRef = ref<InstanceType<typeof LuTooltip>>()

const { disabled, showTooltip, max, min, sliderSize, resetSize, updateDragging, emitChange } =
  inject(sliderInjectionKey, undefined)!
const ns = useNamespace('slider')

const dataState = reactive<SliderButtonDataState>({
  hovering: false,
  dragging: false,
  isClick: false,
  prevX: 0,
  currentX: 0,
  prevY: 0,
  currentY: 0,
  prevPosition: 0,
  newPosition: 0
})
const tooltipOpen = ref(false) //拖动过程中鼠标可能离开trigger，需要手动控制

const currentPosition = computed(
  () => ((props.modelValue - min.value) / (max.value - min.value)) * 100 + '%'
)
const wrapperStyle = computed<CSSProperties>(() =>
  props.vertical ? { bottom: currentPosition.value } : { left: currentPosition.value }
)
const buttonStyle = computed<CSSProperties>(() => ({
  visibility: props.showButton ? 'visible' : 'hidden'
}))

const onButtonDown = (e: MouseEvent | TouchEvent) => {
  if (disabled.value) {
    return
  }
  e.preventDefault()
  onDragStart(e)
  window.addEventListener('mousemove', onDragging)
  window.addEventListener('touchmove', onDragging)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchend', onDragEnd)
}

const onDragStart = (event: MouseEvent | TouchEvent) => {
  dataState.dragging = true
  dataState.isClick = true
  const { clientX, clientY } = getClientXY(event)
  if (props.vertical) {
    dataState.prevY = clientY
  } else {
    dataState.prevX = clientX
  }
  dataState.prevPosition = Number.parseInt(currentPosition.value) //就不开发小数了
  dataState.newPosition = dataState.prevPosition
}

const onDragging = (e: MouseEvent | TouchEvent) => {
  if (!dataState.dragging) {
    return
  }
  dataState.isClick = false
  resetSize()
  tooltipOpen.value = true
  let diff = 0
  const { clientX, clientY } = getClientXY(e)
  if (props.vertical) {
    dataState.currentY = clientY
    // 向下为负，向上为正
    diff = ((dataState.prevY - dataState.currentY) / sliderSize.value) * 100
  } else {
    dataState.currentX = clientX
    diff = ((dataState.currentX - dataState.prevX) / sliderSize.value) * 100
  }
  dataState.newPosition = dataState.prevPosition + diff
  setPosition(dataState.newPosition)
}

const onDragEnd = () => {
  if (!dataState.dragging) {
    return
  }
  /*
   * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
   * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
   */
  setTimeout(() => {
    dataState.dragging = false
    if (!dataState.hovering) {
      tooltipOpen.value = false
    }
    if (!dataState.isClick) {
      setPosition(dataState.newPosition)
    }
    emitChange()
  }, 0) //设置为0也不会立即触发，存在大于0的最小触发时间
  window.removeEventListener('mousemove', onDragging)
  window.removeEventListener('touchmove', onDragging)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchend', onDragEnd)
}

const getClientXY = (event: MouseEvent | TouchEvent) => {
  let clientX: number
  let clientY: number
  if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY
    clientX = (event as TouchEvent).touches[0].clientX
  } else {
    clientY = (event as MouseEvent).clientY
    clientX = (event as MouseEvent).clientX
  }
  return {
    clientX,
    clientY
  }
}

const setPosition = (newPosition: number) => {
  if (newPosition < 0) {
    newPosition = 0
  } else if (newPosition > 100) {
    newPosition = 100
  }
  //注意两头值
  const value = Math.round((newPosition / 100) * (max.value - min.value) + min.value)
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
  nextTick(() => tooltipRef.value?.updatePopper())
}

const handleMouseEnter = () => {
  dataState.hovering = true
  tooltipOpen.value = true
}

const handleMouseLeave = () => {
  dataState.hovering = false
  if (!dataState.dragging) {
    tooltipOpen.value = false
  }
}

const { hovering, dragging } = toRefs(dataState)

watch(
  () => dataState.dragging,
  (val) => {
    updateDragging(val)
  }
)

defineExpose({
  onButtonDown,
  setPosition,
  hovering,
  dragging
})
</script>

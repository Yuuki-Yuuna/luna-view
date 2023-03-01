<template>
  <transition :name="ns.b('fade')">
    <div
      v-show="always || visible"
      ref="instanceRef"
      :class="[ns.e('bar'), ns.is(bar.key)]"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumbRef"
        :class="ns.e('thumb')"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      ></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, unref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { thumbProps } from './thumb'
import { BAR_MAP, renderThumbStyle } from './util'
import { SCROLLBAR_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuThumb'
})

const props = defineProps(thumbProps)

const instanceRef = ref<HTMLDivElement>()
const thumbRef = ref<HTMLDivElement>()

const { scrollbarRef, wrapRef, smooth } = inject(SCROLLBAR_INJECTION_KEY)!
const ns = useNamespace('scrollbar')

let cursorDown = false
let cursorLeave = false
let originalOnSelectStart: ((this: GlobalEventHandlers, ev: Event) => any) | null =
  document.onselectstart

const thumbState = ref<Partial<Record<'X' | 'Y', number>>>({})
const visible = ref(false)
const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
const thumbStyle = computed(() =>
  renderThumbStyle({
    size: props.size,
    move: props.move,
    bar: bar.value
  })
)

const clickThumbHandler = (e: MouseEvent) => {
  e.stopPropagation()
  // ctrl和鼠标中、右键无效
  if (e.ctrlKey || [1, 2].includes(e.button)) {
    return
  }
  window.getSelection()?.removeAllRanges() //清除文本选区
  startDrag(e)
  const el = e.currentTarget as HTMLDivElement
  //鼠标坐标与thumb左下角坐标差
  thumbState.value[bar.value.axis] =
    el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
}

const clickTrackHandler = (e: MouseEvent) => {
  if (!instanceRef.value || !thumbRef.value || !wrapRef.value) {
    return
  }
  //鼠标距离instance左上角坐标差
  const offset =
    e[bar.value.client] - (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction]
  const thumbHalf = thumbRef.value[bar.value.offset] / 2
  if (smooth.value) {
    const opt: ScrollToOptions = { behavior: 'smooth' }
    opt[bar.value.direction] = (offset - thumbHalf) * props.ratio
    wrapRef.value.scrollTo(opt)
  } else {
    // 通过ratio将视觉距离换算回实际距离得百分数
    const thumbPositionPercentage =
      ((offset - thumbHalf) * 100 * props.ratio) / instanceRef.value[bar.value.offset]
    wrapRef.value[bar.value.scroll] =
      (thumbPositionPercentage * wrapRef.value[bar.value.scrollSize]) / 100
  }
}

const startDrag = (e: MouseEvent) => {
  e.stopImmediatePropagation()
  cursorDown = true
  document.addEventListener('mousemove', mouseMoveDocumentHandler)
  document.addEventListener('mouseup', mouseUpDocumentHandler)
  originalOnSelectStart = document.onselectstart
  document.onselectstart = () => false //取消自带的选区事件
}

const mouseMoveDocumentHandler = (e: MouseEvent) => {
  const instance = unref(instanceRef)
  const thumb = unref(thumbRef)
  const wrap = unref(wrapRef)
  if (!instance || !thumb || !wrap) {
    return
  }
  if (cursorDown === false) {
    return
  }

  const prevPage = thumbState.value[bar.value.axis]
  if (!prevPage) {
    return
  }

  const offset = e[bar.value.client] - instance.getBoundingClientRect()[bar.value.direction]
  // 鼠标可能移出thumb，需要thumbState保存开始拖动的位置
  const thumbClickPosition = thumb[bar.value.offset] - prevPage
  const thumbPositionPercentage =
    ((offset - thumbClickPosition) * 100 * props.ratio) / instance[bar.value.offset]
  wrap[bar.value.scroll] = (thumbPositionPercentage * wrap[bar.value.scrollSize]) / 100
}

const mouseUpDocumentHandler = () => {
  cursorDown = false
  thumbState.value[bar.value.axis] = 0
  document.removeEventListener('mousemove', mouseMoveDocumentHandler)
  document.removeEventListener('mouseup', mouseUpDocumentHandler)
  restoreOnselectstart()
  if (cursorLeave) {
    visible.value = false
  }
}

const mouseMoveScrollbarHandler = () => {
  cursorLeave = false
  visible.value = !!props.size
}

const mouseLeaveScrollbarHandler = () => {
  cursorLeave = true
  visible.value = cursorDown
}

//恢复原本selectstart
const restoreOnselectstart = () => {
  if (document.onselectstart !== originalOnSelectStart) {
    document.onselectstart = originalOnSelectStart
  }
}

//移入移出滚动条显示
useEventListener(scrollbarRef, 'mousemove', mouseMoveScrollbarHandler)

useEventListener(scrollbarRef, 'mouseleave', mouseLeaveScrollbarHandler)

onBeforeUnmount(() => {
  restoreOnselectstart()
  document.removeEventListener('mousemove', mouseMoveDocumentHandler)
  document.removeEventListener('mouseup', mouseUpDocumentHandler)
})
</script>

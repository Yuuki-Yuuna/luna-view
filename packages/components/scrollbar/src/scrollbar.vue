<template>
  <div ref="scrollbarRef" :class="ns.b()">
    <div ref="wrapRef" :class="wrapClassName" :style="style" @scroll="handleScroll">
      <component :is="tag" ref="resizeRef" :class="resizeClassName" :style="viewStyle">
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <lu-bar
        ref="barRef"
        :height="sizeHeight"
        :width="sizeWidth"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, provide, ref, toRef, unref, watch } from 'vue'
import { isNumber, useEventListener, useResizeObserver } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import LuBar from './bar.vue'
import { scrollbarEmits, scrollbarProps } from './scrollbar'
import { GAP } from './util'
import { SCROLLBAR_INJECTION_KEY } from './tokens'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuScrollbar'
})

const props = defineProps(scrollbarProps)
const emit = defineEmits(scrollbarEmits)

const scrollbarRef = ref<HTMLDivElement>()
const wrapRef = ref<HTMLDivElement>()
const resizeRef = ref<HTMLElement>()
const barRef = ref<InstanceType<typeof LuBar>>()

const sizeWidth = ref('0')
const sizeHeight = ref('0')
const ratioY = ref(1)
const ratioX = ref(1)

const ns = useNamespace('scrollbar')

let stopResizeObserver: (() => void) | undefined = undefined
let stopResizeListener: (() => void) | undefined = undefined

const wrapClassName = computed(() => [
  ns.e('wrap'),
  props.wrapClass,
  { [ns.em('wrap', 'hidden-default')]: !props.native }
])
const resizeClassName = computed(() => [ns.e('view'), props.viewClass])

const style = computed(() => {
  const style: CSSProperties = {}
  if (props.height) {
    style.height = isNumber(props.height) ? props.height + 'px' : props.height
  }
  if (props.maxHeight) {
    style.maxHeight = isNumber(props.maxHeight) ? props.maxHeight + 'px' : props.maxHeight
  }
  return [props.wrapStyle, style]
})

const handleScroll = () => {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value)
    emit('scroll', {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft
    })
  }
}

const scrollTo = (options: ScrollToOptions) => {
  if (wrapRef.value) {
    wrapRef.value.scrollTo(options)
  }
}

const update = () => {
  const wrap = unref(wrapRef)
  if (!wrap) {
    return
  }
  //增加了上下间隙
  const offsetHeight = wrap.offsetHeight - GAP
  const offsetWidth = wrap.offsetWidth - GAP

  //实际的滚动条thumb长度=可视高与总高之比*可视高(滚动条占比与offset占比相对应)
  const originalHeight = offsetHeight ** 2 / wrap.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrap.scrollWidth

  //视觉滚动thumb条长度受props影响
  const height = Math.max(originalHeight, props.minSize)
  const width = Math.max(originalWidth, props.minSize)
  //实际可移动距离与视觉可移动距离之比（自定义滚动条尺寸会导致视觉可移动距离小于实际可移动距离）
  ratioY.value = (offsetHeight - originalHeight) / (offsetHeight - height)
  ratioX.value = (offsetWidth - originalWidth) / (offsetWidth - width)

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
}

onMounted(() => {
  if (!props.native)
    nextTick(() => {
      update()
    })
})
onUpdated(() => update())

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObserver?.()
      stopResizeListener?.()
    } else {
      stopResizeObserver = useResizeObserver(resizeRef, update).stop //元素size变化触发
      stopResizeListener = useEventListener('resize', update) //视图变化时触发
    }
  },
  {
    immediate: true
  }
)

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native)
      nextTick(() => {
        update()
        if (wrapRef.value) {
          barRef.value?.handleScroll(wrapRef.value)
        }
      })
  }
)

provide(SCROLLBAR_INJECTION_KEY, {
  scrollbarRef,
  wrapRef,
  smooth: toRef(props, 'smooth')
})

defineExpose({
  wrapRef,
  update,
  handleScroll,
  scrollTo
})
</script>

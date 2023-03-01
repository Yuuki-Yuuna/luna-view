<template>
  <lu-thumb :move="moveX" :ratio="ratioX" :size="width" :always="always" />
  <lu-thumb vertical :move="moveY" :ratio="ratioY" :size="height" :always="always" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LuThumb from './thumb.vue'
import { barProps } from './bar'
import { GAP } from './util'

defineOptions({
  name: 'LuBar'
})

const props = defineProps(barProps)

const moveX = ref(0)
const moveY = ref(0)

const handleScroll = (wrap: HTMLDivElement) => {
  const offsetHeight = wrap.offsetHeight - GAP
  const offsetWidth = wrap.offsetWidth - GAP
  //移动一个offestHeight的距离等于滚动条translate 100%
  moveY.value = (wrap.scrollTop * 100) / offsetHeight / props.ratioY
  moveX.value = (wrap.scrollLeft * 100) / offsetWidth / props.ratioX
}

defineExpose({
  handleScroll
})
</script>

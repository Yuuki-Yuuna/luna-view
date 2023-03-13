<template>
  <lu-scrollbar ref="scrollbarRef" height="400px" always @scroll="onScroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="demo-item">{{ item }}</p>
    </div>
  </lu-scrollbar>
  <lu-slider
    v-model="sliderValue"
    :format-tooltip="formatSliderValue"
    :max="max"
    @input="inputSlider"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { LuScrollbar, LuSlider } from 'luna-view'

const scrollbarRef = ref<InstanceType<typeof LuScrollbar>>()
const innerRef = ref<HTMLDivElement>()

const sliderValue = ref(0)
// 收尾p标签上下边距10px导致div高度塌陷，实际高度为clientHeight+20
const max = computed(() => (innerRef.value ? innerRef.value.clientHeight - 380 : 0))

const formatSliderValue = (value: number) => {
  return `${value} px`
}

const onScroll = ({ scrollTop }: { scrollLeft: number; scrollTop: number }) => {
  sliderValue.value = scrollTop
}

const inputSlider = (input: number) => {
  scrollbarRef.value?.scrollTo({ top: input })
}
</script>

<style scoped>
.demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  margin: 10px;
  color: var(--lu-color-primary-first);
  background: var(--lu-color-primary-fourth);
}
</style>

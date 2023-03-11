<template>
  <div class="flex-block">
    <span class="demo-span">默认slider</span>
    <lu-slider v-model="value1" />
  </div>
  <div class="flex-block">
    <span class="demo-span">不显示tooltip</span>
    <lu-slider v-model="value2" :show-tooltip="false" />
  </div>
  <div class="flex-block">
    <span class="demo-span">左方tooltip</span>
    <lu-slider v-model="value4" placement="left" />
  </div>
  <div class="flex-block">
    <span class="demo-span">右方tooltip</span>
    <lu-slider v-model="value5" placement="right" />
  </div>
  <div class="flex-block">
    <span class="demo-span">下方tooltip</span>
    <lu-slider v-model="value3" placement="bottom" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuSlider } from 'luna-view'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)
</script>

<style scoped>
.flex-block {
  display: flex;
  align-items: center;
}

.flex-block + .flex-block {
  margin-top: 12px;
}

.demo-span {
  font-size: 14px;
  white-space: nowrap;
  margin-right: 16px;
  color: var(--lu-text-color-regular);
}
</style>

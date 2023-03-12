<template>
  <div class="flex-block">
    <span class="demo-span">small</span>
    <lu-slider v-model="value2" button-size="small" />
  </div>
  <div class="flex-block">
    <span class="demo-span">default</span>
    <lu-slider v-model="value1" />
  </div>
  <div class="flex-block">
    <span class="demo-span">large</span>
    <lu-slider v-model="value3" button-size="large" />
  </div>
  <div class="flex-block">
    <span class="demo-span">none</span>
    <lu-slider v-model="value4" :show-button="false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuSlider } from 'luna-view'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
</script>

<style scoped>
.flex-block {
  display: flex;
  align-items: center;
}

.demo-span {
  margin-right: 12px;
}

.flex-block + .flex-block {
  margin-top: 15px;
}
</style>

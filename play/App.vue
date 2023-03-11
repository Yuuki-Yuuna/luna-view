<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <div class="test">
      <LuSlider v-model="slider" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuSlider } from '@luna-view/components'

const slider = ref(0)
</script>

<style lang="scss">
.test {
  width: 400px;
  height: 150px;
}
</style>

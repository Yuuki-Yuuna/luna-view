<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <div class="test">
      <!-- <LuSlider v-model="slider" /> -->
      <LuSpace :gap="[10, 12]">
        <LuButton>Button 1</LuButton>
        <LuButton>Button 2</LuButton>
        <LuButton>Button 3</LuButton>
      </LuSpace>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuSlider, LuSpace } from '@luna-view/components'

const slider = ref(0)
</script>

<style lang="scss">
.test {
  width: 400px;
  height: 150px;
}
</style>

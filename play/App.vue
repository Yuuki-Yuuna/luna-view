<template>
  <LuButton round plain @click="() => (show = !show)">按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <LuSpace wrap gap="large">
      <LuButton>按钮1</LuButton>
      <LuButton>按钮2</LuButton>
      <LuButton>按钮3</LuButton>
      <LuButton>按钮4</LuButton>
    </LuSpace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuSpace } from '@luna-view/components'

const show = ref(false)
</script>

<style lang="scss">
.test {
  width: 380px;
  height: 400px;
  margin: 0;
  background-color: gray;
  padding: 50px;
}
</style>

<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <LuTooltip effect="dark">
      <LuButton>按钮</LuButton>
      <template #content>我是下拉</template>
    </LuTooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuTooltip } from '@luna-view/components'

const slider = ref(0)
</script>

<style lang="scss">
.test {
  width: 400px;
  height: 150px;
}
</style>

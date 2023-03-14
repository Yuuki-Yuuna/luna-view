<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <LuButton round plain @click="onClick">弹窗</LuButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuBadge, LuButton, LuMessage } from '@luna-view/components'

const onClick = () => {
  LuMessage({
    type: 'success',
    message: 'hello world!',
    showClose: true,
    grouping: true
  })
  // LuMessage.success('hello world!')
  // LuMessage.info('hello world!')
  // LuMessage.warning('hello world!')
  // LuMessage.error('hello world!')
}
</script>

<style lang="scss">
.test {
  width: 400px;
  height: 150px;
}
</style>

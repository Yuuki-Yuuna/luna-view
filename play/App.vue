<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px', height: '1500px' }">
    <LuButton round plain @click="onClick">弹窗</LuButton>
    <LuDialog v-model="show" title="标题"> hello world! </LuDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuDialog } from '@luna-view/components'

const show = ref(false)

const onClick = () => {
  show.value = true
}
</script>

<style lang="scss">
.test {
  width: 400px;
  height: 150px;
}
</style>

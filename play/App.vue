<template>
  <LuButton round plain>按钮</LuButton>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '150px'
    }"
  >
    <LuVideo v-model="time" src="/sos.mp4" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuVideo } from '@luna-view/components'

const time = ref(20)
</script>

<style lang="scss">
.test {
  width: 600px;
  height: 300px;
}
</style>

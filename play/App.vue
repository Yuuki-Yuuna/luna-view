<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <LuRadio v-model="show" :label="true">radio 1</LuRadio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuRadio } from '@luna-view/components'

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

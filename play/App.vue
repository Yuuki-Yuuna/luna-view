<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <LuRadioGroup v-model="groupValue" @change="onChange" disabled>
      <LuRadio label="1">radio 1</LuRadio>
      <LuRadio>radio 2</LuRadio>
      <LuRadio label="3" @change="test">radio 3</LuRadio>
    </LuRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuRadio, LuRadioGroup } from '@luna-view/components'

const groupValue = ref('1')

const onChange = (val: any) => {
  console.log(val)
}

const test = (val: any) => {
  console.log('test', val)
}
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

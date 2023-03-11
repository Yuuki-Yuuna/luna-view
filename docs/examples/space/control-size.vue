<template>
  <lu-space direction="vertical">
    <lu-radio-group v-model="size">
      <lu-radio label="small">small</lu-radio>
      <lu-radio label="default">default</lu-radio>
      <lu-radio label="large">large</lu-radio>
    </lu-radio-group>
    <lu-space :gap="size">
      Space
      <LuButton>Button</LuButton>
      <LuButton plain>Button</LuButton>
    </lu-space>
  </lu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuRadio, LuRadioGroup, LuSpace } from 'luna-view'

const size = ref<'small' | 'default' | 'large'>('default')
</script>

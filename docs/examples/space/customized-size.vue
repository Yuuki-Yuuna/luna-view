<template>
  <lu-slider v-model="size" />
  <lu-space direction="vertical">
    <lu-space :gap="size">
      Space
      <LuButton>Button</LuButton>
      <LuButton plain>Button</LuButton>
    </lu-space>
  </lu-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuSlider, LuSpace } from 'luna-view'

const size = ref(20)
</script>

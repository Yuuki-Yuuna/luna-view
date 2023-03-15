<template>
  <lu-button plain @click="onClick">center</lu-button>
</template>

<script setup lang="ts">
import { LuButton, LuMessage } from 'luna-view'

const onClick = () => {
  LuMessage({
    message: '居中内容',
    center: true,
    showClose: true
  })
}
</script>

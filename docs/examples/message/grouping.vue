<template>
  <lu-button plain @click="onClick">show message</lu-button>
</template>

<script setup lang="ts">
import { LuButton, LuMessage } from 'luna-view'

const onClick = () => {
  LuMessage({
    type: 'success',
    message: '相同消息会合并',
    grouping: true
  })
}
</script>

<template>
  <lu-button plain @click="onClick">use HTML</lu-button>
</template>

<script setup lang="ts">
import { LuButton, LuMessage } from 'luna-view'

const onClick = () => {
  LuMessage({
    message: '<strong>这是 <i>HTML</i> 片段</strong>',
    dangerouslyUseHTML: true
  })
}
</script>

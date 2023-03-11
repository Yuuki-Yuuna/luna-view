<template>
  <lu-space wrap>
    <div v-for="i in 20" :key="i">
      <lu-button plain>Button</lu-button>
    </div>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace } from 'luna-view'
</script>

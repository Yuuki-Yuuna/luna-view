<template>
  <lu-space direction="vertical">
    <lu-space alignment="start">
      Space
      <lu-button>Button</lu-button>
      <div class="block">Block</div>
    </lu-space>
    <lu-space alignment="center">
      Space
      <lu-button>Button</lu-button>
      <div class="block">Block</div>
    </lu-space>
    <lu-space alignment="end">
      Space
      <lu-button>Button</lu-button>
      <div class="block">Block</div>
    </lu-space>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace } from 'luna-view'
</script>

<style scoped>
.block {
  display: inline-block;
  padding: 32px 8px 16px;
  background: rgba(150, 150, 150, 0.2);
}
</style>

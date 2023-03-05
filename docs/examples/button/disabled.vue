<template>
  <lu-space direction="vertical" gap="large">
    <lu-space>
      <lu-button disabled>default</lu-button>
      <lu-button plain disabled>plain</lu-button>
    </lu-space>
    <lu-space>
      <lu-button round disabled>default</lu-button>
      <lu-button round plain disabled>plain</lu-button>
    </lu-space>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace } from 'luna-view'
</script>

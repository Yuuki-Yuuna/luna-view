<template>
  <lu-space direction="vertical" gap="large">
    <lu-space>
      <lu-button>default</lu-button>
      <lu-button plain>plain</lu-button>
    </lu-space>
    <lu-space>
      <lu-button round>default</lu-button>
      <lu-button round plain>plain</lu-button>
    </lu-space>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace } from 'luna-view'
</script>

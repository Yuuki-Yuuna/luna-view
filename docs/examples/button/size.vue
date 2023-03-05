<template>
  <lu-space direction="vertical" gap="large">
    <lu-space>
      <lu-button size="small">small</lu-button>
      <lu-button size="default">default</lu-button>
      <lu-button size="large">large</lu-button>
    </lu-space>
    <lu-space>
      <lu-button plain round size="small">small</lu-button>
      <lu-button plain round size="default">default</lu-button>
      <lu-button plain round size="large">large</lu-button>
    </lu-space>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace } from 'luna-view'
</script>

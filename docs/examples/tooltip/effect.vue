<template>
  <lu-space>
    <lu-tooltip effect="light" placement="top">
      <lu-button plain>Light</lu-button>
      <template #content>light主题</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" placement="bottom">
      <lu-button plain>Dark</lu-button>
      <template #content>Dark主题</template>
    </lu-tooltip>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace, LuTooltip } from 'luna-view'
</script>

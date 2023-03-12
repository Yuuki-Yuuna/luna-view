<template>
  <lu-space>
    <lu-tooltip effect="dark">
      <lu-button plain>有箭头</lu-button>
      <template #content>tooltip信息</template>
    </lu-tooltip>
    <lu-tooltip effect="dark" :show-arrow="false">
      <lu-button plain>无箭头</lu-button>
      <template #content>tooltip信息</template>
    </lu-tooltip>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace, LuTooltip } from 'luna-view'
</script>

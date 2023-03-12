<template>
  <lu-tooltip>
    <lu-button plain round>按钮</lu-button>
    <template #content>这里是tooltip提示</template>
  </lu-tooltip>
</template>

<script setup lang="ts">
import { LuButton, LuTooltip } from 'luna-view'
</script>

<template>
  <lu-space>
    <lu-tooltip trigger="hover">
      <lu-button plain>hover触发</lu-button>
      <template #content>tooltip信息</template>
    </lu-tooltip>
    <lu-tooltip trigger="click">
      <lu-button plain>click触发</lu-button>
      <template #content>tooltip信息</template>
    </lu-tooltip>
    <lu-tooltip trigger="contextmenu">
      <lu-button plain>contextmenu触发</lu-button>
      <template #content>tooltip信息</template>
    </lu-tooltip>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuSpace, LuTooltip } from 'luna-view'
</script>

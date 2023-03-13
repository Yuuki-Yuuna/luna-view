<template>
  <lu-space>
    <lu-popover title="标题">
      <template #reference>
        <lu-button plain>Hover</lu-button>
      </template>
      <div class="content">这里是内容</div>
    </lu-popover>
    <lu-popover title="标题" trigger="click" placement="top">
      <template #reference>
        <lu-button plain>Click</lu-button>
      </template>
      <div class="content">这里是内容</div>
    </lu-popover>
    <lu-popover title="标题" trigger="contextmenu">
      <template #reference>
        <lu-button plain>Contextmenu</lu-button>
      </template>
      <div class="content">这里是内容</div>
    </lu-popover>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuPopover, LuSpace } from 'luna-view'
</script>

<style scoped>
.content {
  padding: 8px;
}
</style>

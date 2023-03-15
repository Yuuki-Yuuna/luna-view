<template>
  <lu-space :gap="30">
    <lu-badge :value="12" is-dot>
      <lu-button plain>评论</lu-button>
    </lu-badge>
    <lu-badge value="new" is-dot>
      <lu-button plain>收藏</lu-button>
    </lu-badge>
  </lu-space>
</template>

<script setup lang="ts">
import { LuBadge, LuButton, LuSpace } from 'luna-view'
</script>

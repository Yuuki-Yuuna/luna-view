<template>
  <lu-space :gap="30">
    <lu-badge :value="12" type="primary">
      <lu-button plain>primary</lu-button>
    </lu-badge>
    <lu-badge :value="1" type="success">
      <lu-button plain>success</lu-button>
    </lu-badge>
    <lu-badge value="hot" type="warning">
      <lu-button plain>warning</lu-button>
    </lu-badge>
    <lu-badge :value="10" type="error">
      <lu-button plain>error</lu-button>
    </lu-badge>
  </lu-space>
</template>

<script setup lang="ts">
import { LuBadge, LuButton, LuSpace } from 'luna-view'
</script>

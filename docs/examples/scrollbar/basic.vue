<template>
  <lu-scrollbar :height="400">
    <p v-for="item in 20" :key="item" class="demo-item">{{ item }}</p>
  </lu-scrollbar>
</template>

<script setup lang="ts">
import { LuScrollbar } from 'luna-view'
</script>

<style scoped>
.demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  margin: 10px;
  color: var(--lu-color-primary-first);
  background: var(--lu-color-primary-fourth);
}
</style>

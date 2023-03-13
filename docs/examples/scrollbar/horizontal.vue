<template>
  <lu-scrollbar>
    <div class="flex-block">
      <p v-for="item in 50" :key="item" class="demo-item">{{ item }}</p>
    </div>
  </lu-scrollbar>
</template>

<script setup lang="ts">
import { LuScrollbar } from 'luna-view'
</script>

<style scoped>
.flex-block {
  display: flex;
}

.demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100px;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  margin: 10px;
  color: var(--lu-color-primary-first);
  background: var(--lu-color-primary-fourth);
}
</style>

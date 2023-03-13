<template>
  <lu-space gap="large">
    <lu-button plain @click="addItem">增加一项</lu-button>
    <lu-button plain @click="deleteItem">减少一项</lu-button>
  </lu-space>
  <lu-scrollbar max-height="300px">
    <p v-for="item in count" :key="item" class="demo-item">{{ item }}</p>
  </lu-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuScrollbar, LuSpace } from 'luna-view'

const count = ref(3)

const addItem = () => {
  count.value++
}

const deleteItem = () => {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<style scoped>
.demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  margin: 10px;
  color: var(--lu-color-primary-first);
  background: var(--lu-color-primary-fourth);
}
</style>

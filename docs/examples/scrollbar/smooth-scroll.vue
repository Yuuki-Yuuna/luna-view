<template>
  <lu-space gap="large">
    <lu-button plain @click="toBottom">到底部</lu-button>
    <lu-button plain @click="toTop">到顶部</lu-button>
  </lu-space>
  <lu-divider />
  <lu-scrollbar ref="scrollbarRef" height="400px" always smooth>
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="demo-item">{{ item }}</p>
    </div>
  </lu-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuDivider, LuScrollbar, LuSpace } from 'luna-view'

const scrollbarRef = ref<InstanceType<typeof LuScrollbar>>()
const innerRef = ref<HTMLDivElement>()

const toBottom = () => {
  scrollbarRef.value!.scrollTo({ top: innerRef.value!.clientHeight + 20, behavior: 'smooth' })
}

const toTop = () => {
  scrollbarRef.value!.scrollTo({ top: 0, behavior: 'smooth' })
}
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

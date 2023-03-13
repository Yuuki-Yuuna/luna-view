<template>
  <lu-popover :open-status="isOpen" placement="top" :width="160">
    <template #reference>
      <lu-button plain @click="isOpen = true">点击此处</lu-button>
    </template>
    <div class="content">
      <p>这里提示一些内容</p>
      <lu-space class="buttons">
        <lu-button size="small" @click="isOpen = false">确认</lu-button>
        <lu-button size="small" plain @click="isOpen = false">取消</lu-button>
      </lu-space>
    </div>
  </lu-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuPopover, LuSpace } from 'luna-view'

const isOpen = ref(false)
</script>

<style scoped>
.content {
  text-align: center;
}

.buttons {
  margin-top: 15px;
}
</style>

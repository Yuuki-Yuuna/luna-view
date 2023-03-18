<template>
  <lu-button plain @click="show = true">点击弹出 dialog</lu-button>
  <lu-dialog v-model="show" title="标题" width="30%" draggable>
    <span>这是一个可拖拽对话框</span>
    <template #footer>
      <lu-space>
        <lu-button plain @click="show = false">取消</lu-button>
        <lu-button @click="show = false">确认</lu-button>
      </lu-space>
    </template>
  </lu-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuDialog, LuSpace } from 'luna-view'

const show = ref(false)
</script>

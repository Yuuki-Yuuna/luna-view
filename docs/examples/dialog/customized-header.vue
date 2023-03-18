<template>
  <lu-button plain @click="show = true">点击弹出 dialog</lu-button>
  <lu-dialog v-model="show" width="30%">
    <template #header>
      <h5>这是自定义的标题</h5>
    </template>
    <span>这是一条消息</span>
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

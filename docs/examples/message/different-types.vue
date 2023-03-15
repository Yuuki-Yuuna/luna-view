<template>
  <lu-space>
    <lu-button plain @click="showSuccess">success</lu-button>
    <lu-button plain @click="showWarning">warning</lu-button>
    <lu-button plain @click="showInfo">info</lu-button>
    <lu-button plain @click="showError">error</lu-button>
  </lu-space>
</template>

<script setup lang="ts">
import { LuButton, LuMessage, LuSpace } from 'luna-view'

const showSuccess = () => {
  LuMessage.success('这是成功消息！')
}

const showWarning = () => {
  LuMessage.warning('这是警告消息！')
}

const showInfo = () => {
  LuMessage.info('这是提示消息！')
}

const showError = () => {
  LuMessage.error('这是错误消息！')
}
</script>

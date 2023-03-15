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
  LuMessage.success({
    message: '这是成功消息！',
    showClose: true
  })
}

const showWarning = () => {
  LuMessage.warning({
    message: '这是警告消息！',
    showClose: true
  })
}

const showInfo = () => {
  LuMessage.info({
    message: '这是提示消息！',
    showClose: true
  })
}

const showError = () => {
  LuMessage.error({
    message: '这是错误消息！',
    showClose: true
  })
}
</script>

<template>
  <lu-space>
    <lu-button plain @click="showMessage">Show message</lu-button>
    <lu-button plain @click="showVNode">Show VNode</lu-button>
  </lu-space>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { LuButton, LuMessage, LuSpace } from 'luna-view'

const showMessage = () => {
  LuMessage('hello world!')
}

const showVNode = () => {
  LuMessage({
    message: h('p', null, [
      h('span', null, '也可以是一个 '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}
</script>

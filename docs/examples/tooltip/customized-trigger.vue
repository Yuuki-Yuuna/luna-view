<template>
  <lu-tooltip
    effect="dark"
    :open-status="openStatus"
    @before-show="onBeforeShow"
    @before-hide="onBeforeHide"
  >
    <lu-button plain>自定义</lu-button>
    <template #content>tooltip信息</template>
  </lu-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuTooltip } from 'luna-view'

const openStatus = ref(false)

const onBeforeShow = () => {
  openStatus.value = true
}

const onBeforeHide = () => {
  openStatus.value = false
}
</script>

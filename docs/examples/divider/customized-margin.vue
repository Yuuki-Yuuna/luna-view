<template>
  <lu-slider v-model="margin" />
  <div>
    <div>这是上方的一段话</div>
    <lu-divider :margin="margin" />
    <div>这是下方的一段话</div>
  </div>
  <div style="margin-top: 20px">
    <span>这是左方的一段话</span>
    <lu-divider direction="vertical" :margin="margin" />
    <span>这是右方的一段话</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuDivider, LuSlider } from 'luna-view'

const margin = ref(12)
</script>

<template>
  <lu-slider v-model="sliderValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuSlider } from 'luna-view'

const sliderValue = ref(0)
</script>

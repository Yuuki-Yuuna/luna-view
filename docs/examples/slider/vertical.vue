<template>
  <lu-slider v-model="slider" vertical height="200px" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuSlider } from 'luna-view'

const slider = ref(0)
</script>

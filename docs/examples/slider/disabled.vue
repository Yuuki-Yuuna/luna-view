<template>
  <lu-slider v-model="value1" />
  <lu-slider v-model="value2" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuSlider } from 'luna-view'

const value1 = ref(10)
const value2 = ref(10)
</script>

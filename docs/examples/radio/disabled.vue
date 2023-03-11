<template>
  <lu-radio v-model="radio" :label="1" disabled>radio 1</lu-radio>
  <lu-radio v-model="radio" :label="2" disabled>radio 2</lu-radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuRadio } from 'luna-view'

const radio = ref(2)
</script>

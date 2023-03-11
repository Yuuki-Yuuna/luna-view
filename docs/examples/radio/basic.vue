<template>
  <lu-radio v-model="radio1" :label="true">radio 1</lu-radio>
  <lu-radio v-model="radio2" :label="2">radio 2</lu-radio>
  <lu-radio v-model="radio3" label="3">radio 3</lu-radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuRadio } from 'luna-view'

const radio1 = ref(false)
const radio2 = ref(0)
const radio3 = ref('0')
</script>

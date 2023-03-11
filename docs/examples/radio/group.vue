<template>
  <lu-radio-group v-model="radio">
    <lu-radio :label="1">Option 1</lu-radio>
    <lu-radio :label="2">Option 2</lu-radio>
    <lu-radio :label="3">Option 3</lu-radio>
  </lu-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuRadio, LuRadioGroup } from 'luna-view'

const radio = ref(1)
</script>

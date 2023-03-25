<template>
  <lu-video v-model="progress" src="/sos.mp4" :shadow-progress="false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuVideo } from 'luna-view'

const progress = ref(0)
</script>

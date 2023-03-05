<template>
  <div class="example-source-wrapper">
    <div class="example-source language-vue" v-html="decoded" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ source: string }>()

const decoded = computed(() => decodeURIComponent(props.source))
</script>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0 !important;
}
</style>

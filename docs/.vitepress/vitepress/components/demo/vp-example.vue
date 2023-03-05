<template>
  <div class="example-showcase">
    <component :is="demo" v-if="demo" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  file: string
  demo: object
}>()
</script>

<style lang="scss" scoped>
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
  // background-color: var(--bg-color);
}
</style>

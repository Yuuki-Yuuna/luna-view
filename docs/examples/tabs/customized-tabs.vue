<template>
  <lu-tabs v-model="active" class="demo-tabs">
    <lu-tab-pane label="tab1" :name="1">
      <template #label>
        <lu-icon><Star /></lu-icon>
        tab1
      </template>
      Tab Content 1
    </lu-tab-pane>
    <lu-tab-pane label="tab2" :name="2">Tab Content 2</lu-tab-pane>
    <lu-tab-pane label="tab3" :name="3">Tab Content 3</lu-tab-pane>
  </lu-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuIcon, LuTabPane, LuTabs } from 'luna-view'
import { Star } from '@element-plus/icons-vue'

const active = ref(1)
</script>

<style>
.demo-tabs > .lu-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

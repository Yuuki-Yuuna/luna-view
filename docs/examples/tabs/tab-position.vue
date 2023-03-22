<template>
  <lu-radio-group v-model="tabPosition">
    <lu-radio label="top">top</lu-radio>
    <lu-radio label="bottom">bottom</lu-radio>
    <lu-radio label="left">left</lu-radio>
    <lu-radio label="right">right</lu-radio>
  </lu-radio-group>
  <lu-tabs v-model="active" :tab-position="tabPosition" class="demo-tabs">
    <lu-tab-pane label="tab1" :name="1">Tab Content 1</lu-tab-pane>
    <lu-tab-pane label="tab2" :name="2">Tab Content 2</lu-tab-pane>
    <lu-tab-pane label="tab3" :name="3">Tab Content 3</lu-tab-pane>
  </lu-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuRadio, LuRadioGroup, LuTabPane, LuTabs } from 'luna-view'

const active = ref(1)
const tabPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top')
</script>

<style>
.demo-tabs {
  margin-top: 20px;
}

.demo-tabs > .lu-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

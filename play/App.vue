<template>
  <LuButton round plain>按钮</LuButton>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '150px'
    }"
  >
    <div class="test">
      <LuTabs v-model="tab">
        <LuTabPane label="first" :name="1">content 1</LuTabPane>
        <LuTabPane label="second" :name="2">content 2</LuTabPane>
        <LuTabPane label="third" :name="3">content 3</LuTabPane>
        <!-- <LuTabPane v-for="one in 20" :key="one" :name="one">{{ 'content' + one }}</LuTabPane> -->
      </LuTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuButton, LuTabPane, LuTabs } from '@luna-view/components'

// import type { TabPaneName } from '@luna-view/components'

const tab = ref(1)
</script>

<style lang="scss">
.test {
  width: 600px;
  height: 300px;
}
</style>

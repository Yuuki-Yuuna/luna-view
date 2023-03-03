<template>
  <LuButton round plain @click="() => (show = !show)">按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <!-- <LuDropdown>
      <LuButton round plain>按钮</LuButton>
      <template #dropdown>
        <LuDropdownMenu>
          <LuDropdownItem>下拉菜单1</LuDropdownItem>
          <LuDropdownItem>下拉菜单2</LuDropdownItem>
          <LuDropdownItem>下拉菜单3</LuDropdownItem>
        </LuDropdownMenu>
      </template>
    </LuDropdown> -->
    <LuCollapseTransition>
      <div v-show="show">
        <div class="test">下拉</div>
      </div>
    </LuCollapseTransition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  LuButton,
  LuCollapseTransition,
  LuDropdown,
  LuDropdownItem,
  LuDropdownMenu,
  LuScrollbar
} from '@luna-view/components'

const show = ref(false)
</script>

<style lang="scss">
.test {
  width: 380px;
  height: 400px;
  margin: 0;
  background-color: gray;
  padding: 50px;
}
</style>

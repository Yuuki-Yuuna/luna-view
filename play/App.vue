<template>
  <LuButton round plain>按钮</LuButton>
  <div :style="{ display: 'flex', justifyContent: 'center', marginTop: '150px' }">
    <LuDropdown>
      <LuButton round plain>按钮</LuButton>
      <template #dropdown>
        <LuDropdownMenu>
          <LuDropdownItem>下拉菜单1</LuDropdownItem>
          <LuDropdownItem>下拉菜单2</LuDropdownItem>
          <LuDropdownItem>下拉菜单3</LuDropdownItem>
        </LuDropdownMenu>
      </template>
    </LuDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  LuButton,
  LuDropdown,
  LuDropdownItem,
  LuDropdownMenu,
  LuScrollbar
} from '@luna-view/components'
</script>

<style lang="scss">
.test {
  width: 380px;
  height: 400px;
  margin: 0;
  // background-color: gray;
}
</style>

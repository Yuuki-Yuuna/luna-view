<template>
  <lu-dropdown :hide-on-click="false" trigger="click">
    <span class="dropdown-link">下拉菜单</span>
    <template #dropdown>
      <lu-dropdown-menu>
        <lu-dropdown-item>选项1</lu-dropdown-item>
        <lu-dropdown-item>选项2</lu-dropdown-item>
        <lu-dropdown-item>选项3</lu-dropdown-item>
      </lu-dropdown-menu>
    </template>
  </lu-dropdown>
</template>

<script setup lang="ts">
import { LuDropdown, LuDropdownItem, LuDropdownMenu } from 'luna-view'
</script>

<style scoped>
.dropdown-link {
  cursor: pointer;
  color: var(--lu-color-primary-first);
}
</style>

<template>
  <lu-space gap="large">
    <lu-dropdown>
      <span class="dropdown-link">hover触发</span>
      <template #dropdown>
        <lu-dropdown-menu>
          <lu-dropdown-item>选项1</lu-dropdown-item>
          <lu-dropdown-item>选项2</lu-dropdown-item>
          <lu-dropdown-item>选项3</lu-dropdown-item>
        </lu-dropdown-menu>
      </template>
    </lu-dropdown>
    <lu-dropdown trigger="click">
      <span class="dropdown-link">click触发</span>
      <template #dropdown>
        <lu-dropdown-menu>
          <lu-dropdown-item>选项1</lu-dropdown-item>
          <lu-dropdown-item>选项2</lu-dropdown-item>
          <lu-dropdown-item>选项3</lu-dropdown-item>
        </lu-dropdown-menu>
      </template>
    </lu-dropdown>
    <lu-dropdown trigger="contextmenu">
      <span class="dropdown-link">contextmenu触发</span>
      <template #dropdown>
        <lu-dropdown-menu>
          <lu-dropdown-item>选项1</lu-dropdown-item>
          <lu-dropdown-item>选项2</lu-dropdown-item>
          <lu-dropdown-item>选项3</lu-dropdown-item>
        </lu-dropdown-menu>
      </template>
    </lu-dropdown>
  </lu-space>
</template>

<script setup lang="ts">
import { LuDropdown, LuDropdownItem, LuDropdownMenu, LuSpace } from 'luna-view'
</script>

<style scoped>
.dropdown-link {
  cursor: pointer;
  color: var(--lu-text-color-primary);
}
</style>

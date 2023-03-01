<template>
  <ul ref="dropdownMenuRef" :class="[ns.b('menu'), ns.bm('menu', size)]">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { DROPDOWN_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuDropdownMenu'
})

const dropdownMenuRef = ref<HTMLUListElement>()

const ns = useNamespace('dropdown')

const { size } = inject(DROPDOWN_INJECTION_KEY)!

defineExpose({
  dropdownMenuRef
})
</script>

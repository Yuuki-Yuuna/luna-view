<template>
  <li
    ref="dropdownItemRef"
    :class="[ns.be('menu', 'item'), ns.is('disabled', disabled)]"
    @click="onClick"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { dropdownItemEmits, dropdownItemProps } from './dropdown-item'
import { DROPDOWN_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuDropdownItem'
})

const props = defineProps(dropdownItemProps)
const emit = defineEmits(dropdownItemEmits)

const dropdownItemRef = ref<HTMLLIElement>()

const ns = useNamespace('dropdown')
const { hideOnClick, handleClick } = inject(DROPDOWN_INJECTION_KEY)!

const onClick = (e: MouseEvent) => {
  if (props.disabled) {
    return
  }
  if (hideOnClick.value) {
    handleClick()
  }
  emit('click', e)
}

defineExpose({
  dropdownItemRef
})
</script>

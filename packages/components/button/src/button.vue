<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('loading', loading),
      ns.is('round', round),
      ns.is('plain', plain),
      ns.is('circle', circle)
    ]"
    :type="nativeType"
    :auto-focus="autoFocus"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { useNamespace } from '@luna-view/hooks'
import { buttonEmits, buttonProps } from './button'
import { useButton } from './use-button'

defineOptions({
  name: 'LuButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const { _ref, handleClick } = useButton(props, emit)
const ns = useNamespace('button')

defineExpose({
  ref: _ref
})
</script>

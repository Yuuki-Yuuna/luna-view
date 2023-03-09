<template>
  <button
    ref="buttonRef"
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
import { ref } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'LuButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const ns = useNamespace('button')

const buttonRef = ref<HTMLButtonElement>()

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}

defineExpose({
  buttonRef
})
</script>

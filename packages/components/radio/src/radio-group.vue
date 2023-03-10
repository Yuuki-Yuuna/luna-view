<template>
  <div ref="radioGroupRef" :class="ns.b('group')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, reactive, ref, toRefs, watch } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { radioGroupEmits, radioGroupProps } from './radio-group'
import { radioGroupKey } from './tokens'

import type { RadioGroupProps } from './radio-group'

defineOptions({
  name: 'LuRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const radioGroupRef = ref<HTMLDivElement>()

const ns = useNamespace('radio')

const changeEvent = (value: RadioGroupProps['modelValue']) => {
  emit('update:modelValue', value) //更新v-model
  nextTick(() => emit('change', value))
}

provide(
  radioGroupKey,
  //注意类型标注是普通对象，不是ref对象
  reactive({
    ...toRefs(props),
    changeEvent
  })
)
</script>

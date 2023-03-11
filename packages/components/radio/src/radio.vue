<template>
  <label
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('checked', modelValue === label),
      ns.m(size || radioGroup?.size)
    ]"
  >
    <span
      :class="[ns.e('input'), ns.is('disabled', disabled), ns.is('checked', modelValue === label)]"
    >
      <input
        ref="radioRef"
        v-model="modelValue"
        :class="ns.e('original')"
        :value="label"
        type="radio"
        :name="name || radioGroup?.name"
        :disabled="disabled"
        @change="handleChange"
      />
      <span :class="ns.e('inner')"></span>
    </span>
    <span :class="ns.e('label')">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref } from 'vue'
import { useNamespace } from '@luna-view/hooks'
import { radioEmits, radioProps } from './radio'
import { radioGroupKey } from './tokens'

defineOptions({
  name: 'LuRadio'
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const radioRef = ref<HTMLInputElement>()

const radioGroup = inject(radioGroupKey, undefined)
const ns = useNamespace('radio')

//可写计算属性应该是最方便的实现了，不然会很复杂(先开始以为modelValue阴间，小丑竟是我自己)
const modelValue = computed({
  get() {
    return radioGroup ? radioGroup.modelValue : props.modelValue
  },
  set(val) {
    if (radioGroup) {
      radioGroup.changeEvent(val)
    } else {
      emit('update:modelValue', val) //这一步修改props.modelValue
    }
    radioRef.value!.checked = radioGroup
      ? radioGroup.modelValue === props.label
      : props.modelValue === props.label
  }
})

const disabled = computed(() => radioGroup?.disabled || props.disabled) //undefined那个必须写在前面,了解||的原理

const handleChange = () => {
  nextTick(() => emit('change', modelValue.value))
}

defineExpose({
  radioRef
})
</script>

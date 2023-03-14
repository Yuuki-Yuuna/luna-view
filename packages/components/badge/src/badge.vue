<template>
  <div :class="ns.b()">
    <slot />
    <transition :name="`${ns.namespace}-zoom-in-center`">
      <sup
        v-show="!hidden && (content || isDot)"
        :class="[
          ns.e('content'),
          ns.em('content', type),
          ns.is('fixed', !!$slots.default),
          ns.is('dot', isDot)
        ]"
        v-text="content"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isNumber } from '@vueuse/core'
import { useNamespace } from '@luna-view/hooks'
import { badgeProps } from './badge'

defineOptions({
  name: 'LuBadge'
})

const props = defineProps(badgeProps)

const ns = useNamespace('badge')

const content = computed<string>(() => {
  if (props.isDot) {
    return ''
  }
  if (isNumber(props.value)) {
    return props.value > props.max ? `${props.max}+` : `${props.value}`
  }
  return `${props.value}`
})
</script>

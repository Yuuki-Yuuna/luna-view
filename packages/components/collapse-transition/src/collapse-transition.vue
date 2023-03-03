<template>
  <transition :name="ns.b()" v-on="on">
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { useNamespace } from '@luna-view/hooks'

defineOptions({
  name: 'LuCollapseTransition'
})

const ns = useNamespace('collapse-transition')

const on = {
  beforeEnter(el: HTMLElement) {
    el.style.maxHeight = '0px'
  },
  enter(el: HTMLElement) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`
    }
    el.style.overflow = 'hidden'
  },
  afterEnter(el: HTMLElement) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow!
  },
  beforeLeave(el: HTMLElement) {
    el.dataset.oldOverflow = el.style.overflow
    el.style.maxHeight = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = '0px'
    }
  },
  afterLeave(el: HTMLElement) {
    el.style.maxHeight = ''
    el.style.overflow = el.dataset.oldOverflow!
  }
}
</script>

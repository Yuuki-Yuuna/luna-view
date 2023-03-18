<template>
  <div
    ref="dialogRef"
    :class="[
      ns.b(),
      ns.is('draggable', draggable),
      ns.is('align-center', alignCenter),
      { [ns.m('center')]: center },
      customClass
    ]"
    :style="style"
    tabindex="-1"
  >
    <div ref="headerRef" :class="ns.e('header')">
      <span :class="ns.e('title')">
        {{ title }}
      </span>
      <button v-if="showClose" :class="ns.e('headerbtn')" type="button" @click="$emit('close')">
        <lu-icon :class="ns.e('close')">
          <component :is="closeIcon || Close" />
        </lu-icon>
      </button>
    </div>
    <div :class="ns.e('body')">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { LuIcon } from '@luna-view/components/icon'
import { useDraggable, useNamespace } from '@luna-view/hooks'
import { CloseComponents } from '@luna-view/utils'
import { dialogContentEmits, dialogContentProps } from './dialog-content'
import { dialogInjectionKey } from './tokens'

defineOptions({
  name: 'LuDialogContent'
})

const props = defineProps(dialogContentProps)
const emit = defineEmits(dialogContentEmits)

const { Close } = CloseComponents

const headerRef = ref<HTMLDivElement>()

const { dialogRef, style } = inject(dialogInjectionKey, undefined)!
const ns = useNamespace('dialog')

const draggable = computed(() => props.draggable)
useDraggable(dialogRef, headerRef, draggable) //参数限制了bool计算属性
</script>

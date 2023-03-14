<template>
  <transition :name="ns.b('fade')" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div
      v-show="visible"
      ref="messageRef"
      :class="[
        ns.b(),
        { [ns.m(type)]: type && !icon },
        ns.is('center', center),
        ns.is('closable', showClose),
        customClass
      ]"
      :style="customStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <lu-badge v-if="repeatNum > 1" :value="repeatNum" :type="type" :class="ns.e('badge')" />
      <lu-icon v-if="iconComponent" :class="[ns.e('icon'), typeClass]">
        <component :is="iconComponent" />
      </lu-icon>
      <slot>
        <p
          v-if="!dangerouslyUseHTML"
          :class="[ns.e('content'), ns.is('color-changed', changeTextColor)]"
        >
          {{ message }}
        </p>
        <!-- 使用html永远是有风险的.jpg -->
        <p
          v-else
          :class="[ns.e('content'), ns.is('color-changed', changeTextColor)]"
          v-html="message"
        />
      </slot>
      <lu-icon v-if="showClose" :class="ns.e('closeBtn')" @click.stop="close">
        <Close />
      </lu-icon>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { LuIcon } from '@luna-view/components/icon'
import { LuBadge } from '@luna-view/components/badge'
import { useNamespace } from '@luna-view/hooks'
import { TypeComponents, TypeComponentsMap } from '@luna-view/utils'
import { messageEmits, messageProps } from './message'
import { getLastOffset, getOffsetOrSpace } from './instance'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'LuMessage'
})

const props = defineProps(messageProps)
const emit = defineEmits(messageEmits)

const messageRef = ref<HTMLDivElement>()

const { Close } = TypeComponents
const ns = useNamespace('message')

let stopTimer: (() => void) | undefined = undefined
const visible = ref(false)
const height = ref(0)
const typeClass = computed(() => {
  const type = props.type
  // type非空并且找得到
  return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
})
const iconComponent = computed(() => props.icon || TypeComponentsMap[props.type] || '')

const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)
const bottom = computed(() => height.value + offset.value) //底部距屏幕顶距离
const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: props.zIndex
}))

const close = () => {
  visible.value = false
}

const startTimer = () => {
  if (props.duration === 0) {
    return
  }
  stopTimer = useTimeoutFn(() => {
    close()
  }, props.duration).stop
}

const clearTimer = () => {
  stopTimer?.()
}

onMounted(() => {
  startTimer()
  visible.value = true
})

watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  }
)

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  visible,
  bottom,
  close
})
</script>

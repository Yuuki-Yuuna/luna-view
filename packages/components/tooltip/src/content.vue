<template>
  <teleport :disabled="!teleported" :to="appendTo">
    <transition
      :name="transition"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterShow"
      @after-leave="onAfterHide"
    >
      <lu-popper-content
        v-show="controlled"
        ref="contentRef"
        :fallback-placements="fallbackPlacements"
        :offset="offset"
        :placement="placement"
        :strategy="strategy"
        :popper-options="popperOptions"
        :effect="effect"
        :enterable="enterable"
        :popper-class="popperClass"
        :popper-style="popperStyle"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
      >
        <slot />
      </lu-popper-content>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, inject, ref, unref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { LuPopperContent } from '@luna-view/components/popper'
import { usePopperContainerSelector } from '@luna-view/hooks'
import { tooltipContentProps } from './content'
import { TOOLTIP_INJECTION_KEY } from './tokens'

defineOptions({
  name: 'LuTooltipContent'
})

const props = defineProps(tooltipContentProps)

const selector = usePopperContainerSelector()

const contentRef = ref<InstanceType<typeof LuPopperContent>>()

const { controlled, open, trigger, onOpen, onClose, onBeforeShow, onBeforeHide, onShow, onHide } =
  inject(TOOLTIP_INJECTION_KEY)!
const appendTo = computed(() => {
  return props.appendTo || selector
})

watch(open, (val) => {
  if (val) {
    onBeforeShow()
  } else {
    onBeforeHide()
    stopHandle?.() //销毁
  }
})

const onBeforeEnter = () => {
  contentRef.value?.updatePopper?.()
}

const onContentEnter = () => {
  if (props.enterable && unref(trigger) === 'hover') {
    onOpen()
  }
}

const onContentLeave = () => {
  if (unref(trigger) === 'hover') {
    onClose()
  }
}

const onAfterShow = () => {
  onShow()
  //vueuse，返回一个函数，调用后销毁事件
  stopHandle = onClickOutside(
    // 打包检查ts类型时popperContentRef被推成了vue组件，无语，暂未找到解决方法
    computed(() => (unref(contentRef) as any)?.popperContentRef),
    () => {
      if (unref(trigger) != 'hover') {
        onClose()
      }
    }
  )
}

const onAfterHide = () => {
  onHide()
}

let stopHandle: ReturnType<typeof onClickOutside>

defineExpose({
  contentRef
})
</script>

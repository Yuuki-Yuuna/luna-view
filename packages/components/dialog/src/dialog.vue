<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <lu-overlay
        v-show="visible"
        custom-mask-event
        :mask="modal"
        :overlay-class="modalClass"
        :z-index="zIndex"
      >
        <div
          :class="`${ns.namespace}-overlay-dialog`"
          :style="overlayDialogStyle"
          @click="overlayEvent.onClick"
          @mousedown="overlayEvent.onMousedown"
          @mouseup="overlayEvent.onMouseup"
        >
          <lu-dialog-content
            v-if="rendered"
            ref="dialogContentRef"
            :custom-class="customClass"
            :center="center"
            :align-center="alignCenter"
            :close-icon="closeIcon"
            :draggable="draggable"
            :show-close="showClose"
            :title="title"
            @close="handleClose"
          >
            <template v-if="$slots.header" #header>
              <slot name="header" />
            </template>
            <slot />
            <template v-if="$slots.footer" #footer>
              <slot name="footer" />
            </template>
          </lu-dialog-content>
        </div>
      </lu-overlay>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { LuOverlay } from '@luna-view/components/overlay'
import { useNamespace, useSameTarget } from '@luna-view/hooks'
import { dialogEmits, dialogProps } from './dialog'
import LuDialogContent from './dialog-content.vue'
import { useDialog } from './use-dialog'
import { dialogInjectionKey } from './tokens'

defineOptions({
  name: 'LuDialog'
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const dialogRef = ref<HTMLElement>()
const dialogContentRef = ref<InstanceType<typeof LuDialogContent>>()

const ns = useNamespace('dialog')

const {
  afterEnter,
  afterLeave,
  beforeLeave,
  visible,
  rendered,
  zIndex,
  overlayDialogStyle,
  style,
  onModalClick,
  handleClose
} = useDialog(props, emit, dialogRef)

const overlayEvent = useSameTarget(onModalClick)

provide(dialogInjectionKey, {
  dialogRef,
  style
})

defineExpose({
  visible,
  dialogContentRef
})
</script>

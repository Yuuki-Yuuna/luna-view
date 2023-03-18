import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { isClient, useTimeoutFn } from '@vueuse/core'
import { useLockscreen, useZIndex } from '@luna-view/hooks'
import { addUnit } from '@luna-view/utils'

import type { CSSProperties, Ref, SetupContext } from 'vue'
import type { DialogEmits, DialogProps } from './dialog'

export const useDialog = (
  props: DialogProps,
  emit: SetupContext<DialogEmits>['emit'],
  targetRef: Ref<HTMLElement | undefined>
) => {
  const { nextZIndex } = useZIndex()

  const visible = ref(false)
  const rendered = ref(false) //是否还要渲染dialog内容，destroyOnCloses时应当设false
  const zIndex = ref(props.zIndex || nextZIndex())

  let stopOpenTimer: (() => void) | undefined = undefined //延时打开控制器
  let stopCloseTimer: (() => void) | undefined = undefined //延时关闭控制器

  const style = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (props.top) {
      style.marginTop = addUnit(props.top)
    }
    if (props.width) {
      style.width = addUnit(props.width)
    }
    return style
  })

  const overlayDialogStyle = computed<CSSProperties>(() =>
    props.alignCenter ? { display: 'flex' } : {}
  )

  const afterEnter = () => {
    emit('opened')
  }

  const beforeLeave = () => {
    emit('close')
  }

  const afterLeave = () => {
    emit('closed')
    emit('update:modelValue', false)
    if (props.destroyOnClose) {
      rendered.value = false
    }
  }

  const open = () => {
    stopCloseTimer?.()
    stopOpenTimer?.()

    if (props.openDelay && props.openDelay > 0) {
      ;({ stop: stopOpenTimer } = useTimeoutFn(() => doOpen(), props.openDelay))
    } else {
      doOpen()
    }
  }

  const close = () => {
    stopOpenTimer?.()
    stopCloseTimer?.()

    if (props.closeDelay && props.closeDelay > 0) {
      ;({ stop: stopCloseTimer } = useTimeoutFn(() => doClose(), props.closeDelay))
    } else {
      doClose()
    }
  }

  const handleClose = () => {
    const hide = (shouldCancel?: boolean) => {
      if (shouldCancel) {
        return
      }
      visible.value = false
    }

    if (props.beforeClose) {
      props.beforeClose(hide)
    } else {
      close()
    }
  }
  const onModalClick = () => {
    if (props.closeOnClickModal) {
      handleClose()
    }
  }

  const doOpen = () => {
    if (!isClient) {
      return
    }
    visible.value = true
  }

  const doClose = () => {
    visible.value = false
  }

  if (props.lockScroll) {
    useLockscreen(visible)
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        open()
        rendered.value = true // lazy rendering
        zIndex.value = props.zIndex ? zIndex.value++ : nextZIndex()
        nextTick(() => {
          emit('open')
          if (targetRef.value) {
            targetRef.value.scrollTop = 0
          }
        })
      } else {
        if (visible.value) {
          close()
        }
      }
    }
  )

  onMounted(() => {
    if (props.modelValue) {
      visible.value = true
      rendered.value = true
      open()
    }
  })

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex
  }
}

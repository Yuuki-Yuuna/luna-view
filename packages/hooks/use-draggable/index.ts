import { onBeforeUnmount, onMounted, watchEffect } from 'vue'
import { addUnit } from '@luna-view/utils'

import type { ComputedRef, Ref } from 'vue'

export const useDraggable = (
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: ComputedRef<boolean>
) => {
  // 通过transform属性拖动
  let transform = {
    offsetX: 0,
    offsetY: 0
  }

  const onMousedown = (e: MouseEvent) => {
    const downX = e.clientX
    const downY = e.clientY
    const { offsetX, offsetY } = transform

    const targetRect = targetRef.value!.getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    // docment区域宽高
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    // 上边界与左边界
    const minLeft = -targetLeft + offsetX //例如offsetX为0时最多translateX(-targetLeft)
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    const onMousemove = (e: MouseEvent) => {
      // 限制边界
      const moveX = Math.min(Math.max(offsetX + e.clientX - downX, minLeft), maxLeft)
      const moveY = Math.min(Math.max(offsetY + e.clientY - downY, minTop), maxTop)

      transform = {
        offsetX: moveX,
        offsetY: moveY
      }
      targetRef.value!.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`
    }

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  const onDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown)
    }
  }

  const offDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown)
    }
  }

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        onDraggable()
      } else {
        offDraggable()
      }
    })
  })

  onBeforeUnmount(() => {
    offDraggable()
  })
}

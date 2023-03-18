import { NOOP } from '@vue/shared'

// 该hooks的作用是确认事件只能通过元素本身触发，而不允许通过事件冒泡一类的方式触发
export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP }
  }

  let mousedownTarget = false
  let mouseupTarget = false

  // 事件触发顺序：mousedown -> mouseup -> click
  const onClick = (e: MouseEvent) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e)
    }
    mousedownTarget = mouseupTarget = false
  }

  const onMousedown = (e: MouseEvent) => {
    mousedownTarget = e.target === e.currentTarget
  }

  const onMouseup = (e: MouseEvent) => {
    mouseupTarget = e.target === e.currentTarget
  }

  return { onClick, onMousedown, onMouseup }
}

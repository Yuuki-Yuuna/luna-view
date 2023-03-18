import { defineComponent, renderSlot } from 'vue'
import { useNamespace, useSameTarget } from '@luna-view/hooks'
import { buildProps, definePropType } from '@luna-view/utils'

import type { ExtractPropTypes } from 'vue'
import type { ZIndexProperty } from 'csstype'
import type { ClassType } from '@luna-view/utils'

export const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true
  },
  // 自定义遮罩事件
  customMaskEvent: {
    type: Boolean,
    default: false
  },
  overlayClass: {
    type: definePropType<ClassType>([String, Array, Object])
  },
  zIndex: {
    type: definePropType<ZIndexProperty>([String, Number])
  }
} as const)
export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}
export type OverlayEmits = typeof overlayEmits

export default defineComponent({
  name: 'LuOverlay',
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace('overlay')

    const onMaskClick = (e: MouseEvent) => {
      emit('click', e)
    }

    const { onClick, onMousedown, onMouseup } = useSameTarget(
      props.customMaskEvent ? undefined : onMaskClick
    )

    //必须返回渲染函数
    return () =>
      props.mask ? (
        <div
          class={[ns.b(), props.overlayClass]}
          style={{ zIndex: props.zIndex }}
          onMousedown={onMousedown}
          onMouseup={onMouseup}
          onClick={onClick}
        >
          {renderSlot(slots, 'default')}
        </div>
      ) : (
        <div
          class={props.overlayClass}
          style={{
            zIndex: props.zIndex,
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
          }}
        >
          {renderSlot(slots, 'default')}
        </div>
      )
  }
})

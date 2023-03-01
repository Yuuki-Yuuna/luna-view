import { Comment, Fragment, Text, defineComponent, inject, withDirectives } from 'vue'
import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective, useNamespace } from '@luna-view/hooks'

import type { VNode } from 'vue'

export const OnlyChild = defineComponent({
  name: 'LuOnlyChild',
  setup(props, { slots, attrs }) {
    const defaultSlot = slots.default?.(attrs)
    const firstLegalNode = findFirstLegalChild(defaultSlot)
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY)
    const forwardRefDirective = useForwardRefDirective(
      forwardRefInjection?.setForwardRef ?? (() => {})
    )

    return () => (firstLegalNode ? withDirectives(firstLegalNode, [[forwardRefDirective]]) : null)
  }
})

const findFirstLegalChild = (node: VNode[] | undefined): VNode | null => {
  if (!node) {
    return null
  }
  const children = node as VNode[]
  for (const child of children) {
    if (!child) {
      continue
    }
    switch (child.type) {
      case Comment:
        continue
      case Text:
      case 'svg':
        return wrapContent(child)
      case Fragment:
        return findFirstLegalChild(child.children as VNode[])
      default:
        return child
    }
  }
  return null
}

const wrapContent = (content: string | VNode) => {
  const ns = useNamespace('only-child')

  return <span class={ns.e('content')}>{content}</span>
}

export default OnlyChild

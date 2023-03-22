import { isVNode, shallowRef } from 'vue'
import { isArray } from '@vue/shared'

import type { ComponentInternalInstance, VNode, VNodeArrayChildren, VNodeChild } from 'vue'

type FlattenVNodes = Exclude<VNodeChild, VNodeArrayChildren>[] //VNodeChildAtom没有导出，通过计算得出

// 源码那个类型标注真看不懂，所以我先选用最大的类型VNodeChild接收，日后再战！(扁平化)
const flatChildren = (children: VNodeChild): FlattenVNodes => {
  const vNodes = isArray(children) ? children : [children]
  const result: FlattenVNodes = []

  vNodes.forEach((child) => {
    if (isArray(child)) {
      result.push(...flatChildren(child))
    } else if (isVNode(child) && isArray(child.children)) {
      // 不知道为什么有children的节点都不是组件，不用push
      result.push(...flatChildren(child.children))
    } else {
      result.push(child)
      if (isVNode(child) && child.component?.subTree) {
        result.push(...flatChildren(child.component.subTree))
      }
    }
  })

  return result
}

// 得到具有DOM渲染序列的子元素
const getOrderedChildren = <T>(
  vm: ComponentInternalInstance,
  childComponentName: string,
  children: Record<number, T> // uid-泛型键值对
) => {
  //获得传入组件名的所有组件VNode
  const nodes = flatChildren(vm.subTree).filter(
    (n): n is VNode => isVNode(n) && (n.type as any)?.name === childComponentName && !!n.component
  )
  const uids = nodes.map((n) => n.component!.uid)
  return uids.map((uid) => children[uid]).filter((p) => !!p) //将children按找Vnode渲染的顺序排序
}

// 维护一个具有DOM序列的children(是手动的)
export const useOrderedChildren = <T extends { uid: number }>(
  vm: ComponentInternalInstance,
  childComponentName: string
) => {
  const children: Record<number, T> = {}
  const orderedChildren = shallowRef<T[]>([])

  const addChild = (child: T) => {
    children[child.uid] = child
    orderedChildren.value = getOrderedChildren(vm, childComponentName, children)
  }
  const removeChild = (uid: number) => {
    delete children[uid]
    orderedChildren.value = orderedChildren.value.filter((children) => children.uid !== uid)
  }

  return {
    children: orderedChildren,
    addChild,
    removeChild
  }
}

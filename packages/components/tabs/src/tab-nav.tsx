import { computed, defineComponent, inject, nextTick, onMounted, onUpdated, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useNamespace } from '@luna-view/hooks'
import { buildProps, definePropType } from '@luna-view/utils'
import { LuIcon } from '@luna-view/components/icon'
import { tabsRootContextKey } from './tokens'
import TabBar from './tab-bar.vue'

import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { TabPaneName } from './tabs'
import type { TabsPaneContext } from './tokens'

interface Scrollable {
  next?: boolean //是否还能向前移动
  prev?: number //偏移量
}

export const tabNavProps = buildProps({
  //tab标头数组
  panes: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => [] as TabsPaneContext[]
  },
  currentName: {
    type: definePropType<string | number>([String, Number]),
    default: ''
  },
  tabPosition: {
    type: definePropType<'top' | 'right' | 'bottom' | 'left'>(String),
    default: 'top'
  },
  stretch: {
    type: Boolean,
    default: false
  }
} as const)
export type TabNavProps = ExtractPropTypes<typeof tabNavProps>

export const tabNavEmits = {
  tabClick: (tab: TabsPaneContext, tabName: TabPaneName, ev: MouseEvent) => ev instanceof MouseEvent
}
export type TabNavEmits = typeof tabNavEmits

const TabNav = defineComponent({
  name: 'LuTabNav',
  props: tabNavProps,
  emits: tabNavEmits,
  setup(props, { expose, emit }) {
    const navWrapRef = ref<HTMLDivElement>()
    const navScrollRef = ref<HTMLDivElement>() //滚动容器
    const navRef = ref<HTMLDivElement>()

    const rootTabs = inject(tabsRootContextKey, undefined)!

    const ns = useNamespace('tabs')
    const scrollable = ref<Scrollable | null>(null) //是否可滚动
    const navOffset = ref(0) //向右移动的像素量

    const sizeName = computed(() =>
      ['top', 'bottom'].includes(props.tabPosition) ? 'Width' : 'Height'
    )
    const navStyle = computed<CSSProperties>(() => {
      const direction = sizeName.value === 'Width' ? 'X' : 'Y'
      return {
        transform: `translate${direction}(-${navOffset.value}px)` //右移为负
      }
    })

    const scrollPrev = () => {
      if (!navScrollRef.value) {
        return
      }
      const containerSize = navScrollRef.value[`offset${sizeName.value}`]
      const currentOffset = navOffset.value

      //为0时在最左侧，无需操作
      if (!currentOffset) {
        return
      }

      // 向右移动的量减少一个容器的大小，不够时即到达最左侧
      const newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0
      navOffset.value = newOffset
    }

    const scrollNext = () => {
      if (!navScrollRef.value || !navRef.value) {
        return
      }
      const navSize = navRef.value[`offset${sizeName.value}`]
      const containerSize = navScrollRef.value[`offset${sizeName.value}`]
      const currentOffset = navOffset.value

      // 右侧剩余长度小于容器长度
      if (navSize - currentOffset <= containerSize) {
        return
      }

      const newOffset = currentOffset + containerSize
      navOffset.value = newOffset
    }

    const scrollToActiveTab = async () => {
      if (!scrollable.value || !navWrapRef.value || !navScrollRef.value || !navRef.value) {
        return
      }
      await nextTick()
      const activeTab = navWrapRef.value.querySelector('.is-active')
      if (!activeTab) {
        return
      }
      const isHorizontal = ['top', 'bottom'].includes(props.tabPosition)
      const activeTabBounding = activeTab.getBoundingClientRect()
      const navScrollBounding = navScrollRef.value.getBoundingClientRect()
      const maxOffset = isHorizontal
        ? navRef.value.offsetWidth - navScrollBounding.width
        : navRef.value.offsetHeight - navScrollBounding.height
      const currentOffset = navOffset.value
      let newOffset = currentOffset

      if (isHorizontal) {
        // 激活tab左侧超出容器左边界
        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left)
        }
        // 激活tab右侧超出容器右边界
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top)
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom)
        }
      }
      newOffset = Math.max(newOffset, 0)
      navOffset.value = Math.min(newOffset, maxOffset)
    }

    const update = () => {
      if (!navRef.value || !navScrollRef.value) {
        return
      }
      const navSize = navRef.value[`offset${sizeName.value}`]
      const containerSize = navScrollRef.value[`offset${sizeName.value}`]
      const currentOffset = navOffset.value

      if (containerSize < navSize) {
        scrollable.value = scrollable.value || {}
        scrollable.value.prev = currentOffset
        scrollable.value.next = currentOffset + containerSize < navSize
        // 如果nav剩余长度小于容器长度，将最nav右侧移动至容器右侧
        // if (navSize - currentOffset < containerSize) {
        //   navOffset.value = navSize - containerSize
        // }
      } else {
        scrollable.value = null
        if (currentOffset > 0) {
          navOffset.value = 0
        }
      }
    }

    useResizeObserver(navWrapRef, update)

    onMounted(() => setTimeout(() => scrollToActiveTab(), 0)) //异步任务晚update一步执行
    onUpdated(() => update())

    expose({
      scrollToActiveTab
    })

    return () => {
      const scrollBtn = scrollable.value
        ? [
            <span
              class={[ns.e('nav-prev'), ns.is('disabled', !scrollable.value.prev)]}
              onClick={scrollPrev}
            >
              <LuIcon>
                <ArrowLeft />
              </LuIcon>
            </span>,
            <span
              class={[ns.e('nav-next'), ns.is('disabled', !scrollable.value.next)]}
              onClick={scrollNext}
            >
              <LuIcon>
                <ArrowRight />
              </LuIcon>
            </span>
          ]
        : null

      //加工所有标头
      const tabs = props.panes.map((pane, index) => {
        const uid = pane.uid
        const disabled = pane.props.disabled
        const tabName = pane.props.name ?? `${index}`
        const tabLabelContent = pane.slots.label?.() || (pane.props.label ?? tabName)
        pane.index = `${index}`
        // 返回的ref留给bar使用

        return (
          <div
            ref={`tab-${uid}`}
            key={`tab-${uid}`}
            class={[
              ns.e('item'),
              ns.is(rootTabs.props.tabPosition),
              ns.is('active', pane.active),
              ns.is('disabled', disabled)
            ]}
            onClick={(evt: MouseEvent) => {
              emit('tabClick', pane, tabName, evt)
            }}
          >
            {tabLabelContent}
          </div>
        )
      })

      /**
       * 由于panes是普通数组，当数组内部变动时props并不能监听到，就会复用dom
       * 所以每一次渲染函数执行时，我们都重新渲染一个panes，即[...props.panes]
       */
      return (
        <div
          ref={navWrapRef}
          class={[
            ns.e('nav-wrap'),
            ns.is('scrollable', !!scrollable.value),
            ns.is(rootTabs.props.tabPosition)
          ]}
        >
          {scrollBtn}
          <div class={ns.e('nav-scroll')} ref={navScrollRef}>
            <div
              class={[
                ns.e('nav'),
                ns.is(rootTabs.props.tabPosition),
                ns.is(
                  'stretch',
                  props.stretch && ['top', 'bottom'].includes(rootTabs.props.tabPosition)
                )
              ]}
              ref={navRef}
              style={navStyle.value}
            >
              {...[<TabBar panes={[...props.panes]} />, tabs]}
            </div>
          </div>
        </div>
      )
    }
  }
})

export type TabNavInstance = InstanceType<typeof TabNav>
export default TabNav

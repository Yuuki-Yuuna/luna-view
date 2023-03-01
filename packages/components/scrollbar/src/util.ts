import type { CSSProperties } from 'vue'
import type { ThumbProps } from './thumb'

export const GAP = 4 // gap，间隙，顶部与底部留2的间隙

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
} as const

// Pick返回第二个泛型作key的子对象
export const renderThumbStyle = ({
  move,
  size,
  bar
}: Pick<ThumbProps, 'move' | 'size'> & {
  bar: (typeof BAR_MAP)[keyof typeof BAR_MAP]
}): CSSProperties => ({ [bar.size]: size, transform: `translate${bar.axis}(${move}%)` })

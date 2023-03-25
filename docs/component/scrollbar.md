# Scrollbar 滚动条

用于替换浏览器原生滚动条

## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应

::: demo

scrollbar/basic

:::

<VpTips name="ursule">

滚动条没有占体积，而是定位在最右侧，可通过设置右边距留出位置

</VpTips>

## 横向滚动

当元素宽度大于滚动条宽度时，会显示横向滚动条

::: demo

scrollbar/horizontal

:::

## 最大高度

当元素高度超过最大高度，才会显示滚动条

::: demo

scrollbar/max-height

:::

## 手动滚动

作者提供了 scrollTo 方法，功能与传入参数与原生的 scrollTo 相同

此处以竖直滚动为例，实现手动滚动

::: demo

scrollbar/controlled-scroll

:::

## 平滑滚动

如果你需要让你的滚动过渡更加平滑，可以使用 `smooth` 属性，通过 scrollTo 方法滚动时，需加入 `behavior: 'smooth'` 的配置项

::: demo

scrollbar/smooth-scroll

:::

## Scrollbar API

### Attributes

| 属性名     | 说明                                                                 | 类型                 | 默认值 |
| ---------- | -------------------------------------------------------------------- | -------------------- | ------ |
| height     | 滚动条高度                                                           | `string` \| `number` | -      |
| max-height | 滚动条最大高度                                                       | `string` \| `number` | -      |
| native     | 是否使用原生滚动条样式                                               | `boolean`            | false  |
| wrapStyle  | 包裹容器的自定义样式                                                 | `StyleValue`         | -      |
| wrap-class | 包裹容器的自定义类名                                                 | `string`             | -      |
| viewStyle  | 视图的自定义样式                                                     | `StyleValue`         | -      |
| viewClass  | 视图的自定义类名                                                     | `string`             | -      |
| noresize   | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean`            | false  |
| tag        | 视图的元素标签                                                       | `string`             | div    |
| always     | 滚动条总是显示                                                       | `boolean`            | false  |
| min-size   | 滚动条最小尺寸                                                       | `number`             | 20     |
| smooth     | 是否平滑滚动                                                         | `boolean`            | false  |

### Events

| 事件名 | 说明                             | 类型                                                  |
| ------ | -------------------------------- | ----------------------------------------------------- |
| scroll | 当触发滚动事件时，返回滚动的距离 | `({ scrollLeft: number, scrollTop: number }) => void` |

### Exposes

| 名称         | 说明                  | 类型                                 |
| ------------ | --------------------- | ------------------------------------ |
| handleScroll | 触发滚动事件          | `() => void`                         |
| scrollTo     | 滚动至特定坐标        | `(options: ScrollToOptions) => void` |
| update       | 手动更新滚动条状态    | `() => void`                         |
| wrapRef      | 滚动条包裹的 ref 对象 | `HTMLDivElement`                |

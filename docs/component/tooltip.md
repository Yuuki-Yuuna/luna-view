# Tooltip 文字提示

简单的文字提示气泡框，使用 lu-popper 实现

::: tip

在 SSR ([Nuxt](https://nuxt.com/blog/v3))和 SSG ([VitePress](https://vitepress.dev/))场景下，你需要将组件包裹在 `<client-only></client-only>` 中

:::

## 基础用法

使用 Tooltip 包裹需要提示的内容, 通过 content 插槽插入提示信息

::: demo

tooltip/basic

:::

## 显示位置

使用 `placement` 属性决定提示信息的位置， `placement` 属性值为：方向-对齐位置；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。 如 placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐

::: demo

tooltip/placement

:::

## 主题

Tooltip 组件内置了两个主题：`dark` 和 `light`

通过设置 `effect` 来修改主题，默认值为 `light`

::: demo

tooltip/effect

:::

## 箭头展示

通过 `show-arrow` 属性决定是否展示箭头，默认为 `true`

::: demo

tooltip/show-arrow

:::

## 触发方式

通过 `trigger` 属性设置触发方式，默认为 `hover`

::: demo

tooltip/trigger

:::

## 自定义触发

支持 React 风格的触发方式，是否显示完全取决于 `open-status` 属性

lu-tooltip 提供了 `before-show` 和 `before-hide` 事件，即使设置了 `open-status` 属性，这些事件仍会按照 `trigger` 指定的触发方式在 Tooltip 显示和隐藏前调用。 当然，你也可以在其他任何你想要显示和隐藏 Tooltip 时修改 `open-status`

::: demo

tooltip/customized-trigger

:::

## Tooltip API

### Attributes

| 属性名         | 说明                                  | 类型                                                   | 默认值               |
| -------------- | ------------------------------------- | ------------------------------------------------------ | -------------------- |
| trigger        | 触发方式                              | `'hover'` \| `'focus'` \| `'click'` \| `'contextmenu'` | hover                |
| placement      | 显示位置                              | `Placement`                                            | bottom               |
| effect         | tooltip 主题                          | `'light'` \| `'dark'`                                  | light                |
| show-arrow     | 是否展示箭头                          | `boolean`                                              | true                 |
| disabled       | 是否禁用                              | `boolean`                                              | false                |
| open-status    | 自定义 tooltip 的显示和隐藏           | `boolean`                                              | -                    |
| popper-class   | 为 tooltip 的 popper 添加类名         | `string`                                               | -                    |
| popper-style   | 为 tooltip 的 popper 添加样式         | `StyleValue`                                           | -                    |
| enterable      | 鼠标是否可进入到 tooltip 中           | `boolean`                                              | true                 |
| offset         | tooltip 出现位置的偏移量              | `number`                                               | 12                   |
| arrow-offset   | tooltip 箭头的偏移量                  | `number`                                               | 5                    |
| show-after     | 延迟显示，单位毫秒                    | `number`                                               | -                    |
| hide-after     | 延迟关闭，单位毫秒                    | `number`                                               | 200                  |
| popper-options | popper.js 配置项                      | 见 [popper.js](https://popper.js.org/docs/v2/)         | 暂不提供             |
| teleported     | 是否使用 teleport 传至 append-to 位置 | `boolean`                                              | true                 |
| append-to      | 指示 tooltip 的内容将附加的网页元素   | `CSS 选择器` \| `HTMLElement`                          | #lu-popper-container |
| transition     | 动画名称                              | `string`                                               | lu-fade-in-linear    |

#### Placement

`'top' | 'top-start'| 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' |'right-end'`

### Tooltip Events

| 事件名      | 说明               | 类型         |
| ----------- | ------------------ | ------------ |
| before-show | tooltip 显示前触发 | `() => void` |
| before-hide | tooltip 隐藏前触发 | `() => void` |
| show        | tooltip 显示后触发 | `() => void` |
| hide        | tooltip 隐藏后触发 | `() => void` |

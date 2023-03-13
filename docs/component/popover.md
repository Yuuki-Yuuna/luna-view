# Popover 气泡卡片

弹出气泡式的卡片浮层，同样使用 lu-popper 实现

## 基础用法

实际上就是个套壳 Tooltip，支持所有 lu-tooltip 的属性

此外，新增了标题属性和宽度属性，插槽中放入的对象发生了变化

::: demo

popover/basic

:::

## 嵌套操作

虽然 Tooltip 也支持嵌套，但使用 Popover 嵌套语义化更强，支持度也相对更好

::: demo

popover/nested-operation

:::

## Popover API

### Attributes

| 属性名         | 说明                                  | 类型                                                   | 默认值               |
| -------------- | ------------------------------------- | ------------------------------------------------------ | -------------------- |
| title          | 标题                                  | string                                                 | -                    |
| width          | 宽度                                  | `string` \| `number`                                   | 150                  |
| trigger        | 触发方式                              | `'hover'` \| `'focus'` \| `'click'` \| `'contextmenu'` | hover                |
| placement      | 显示位置                              | `Placement`                                            | bottom               |
| effect         | tooltip 主题                          | `'light'` \| `'dark'`                                  | light                |
| show-arrow     | 是否展示箭头                          | `boolean`                                              | true                 |
| disabled       | 是否禁用                              | `boolean`                                              | false                |
| open-status    | 自定义 tooltip 的显示和隐藏          | `boolean`                                              | -                    |
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

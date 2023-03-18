# Dropdown 下拉菜单

向下弹出的列表，实际上也是套壳 Tooltip

::: tip

在 SSR ([Nuxt](https://nuxt.com/blog/v3))和 SSG ([VitePress](https://vitepress.dev/))场景下，你需要将组件包裹在 `<client-only></client-only>` 中

:::

## 基础用法

悬停在下拉菜单上以展开更多操作

::: demo

dropdown/basic

:::

## 触发方式

使用 `trigger` 属性决定下拉菜单的触发方式

::: demo

dropdown/trigger

:::

## 菜单项隐藏方式

下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 false 可以关闭此功能

::: demo

dropdown/hide

:::

## 尺寸

使用 size 属性配置尺寸，可选的尺寸大小有: large, default 或 small

::: demo

dropdown/size

:::

## Dropdown API

### Attributes

| 属性名         | 说明                                  | 类型                                                   | 默认值               |
| -------------- | ------------------------------------- | ------------------------------------------------------ | -------------------- |
| hide-on-click  | 是否在点击菜单项后隐藏菜单            | `boolean`                                              | true                 |
| size           | 菜单尺寸                              | `'large'`\| `'default'`\| `'small'`                    | -                    |
| max-height     | 菜单最大高度                          | `string` \| `number`                                   | -                    |
| trigger        | 触发方式                              | `'hover'` \| `'focus'` \| `'click'` \| `'contextmenu'` | hover                |
| placement      | 显示位置                              | `Placement`                                            | bottom               |
| show-arrow     | 是否展示箭头                          | `boolean`                                              | true                 |
| disabled       | 是否禁用                              | `boolean`                                              | false                |
| open-status    | 自定义 dropdown 的显示和隐藏          | `boolean`                                              | -                    |
| popper-class   | 为 popper 添加类名                    | `string`                                               | -                    |
| popper-style   | 为 popper 添加样式                    | `StyleValue`                                           | -                    |
| offset         | dropdown 出现位置的偏移量             | `number`                                               | 12                   |
| arrow-offset   | dropdown 箭头的偏移量                 | `number`                                               | 5                    |
| show-after     | 延迟显示，单位毫秒                    | `number`                                               | -                    |
| hide-after     | 延迟关闭，单位毫秒                    | `number`                                               | 200                  |
| popper-options | popper.js 配置项                      | 见 [popper.js](https://popper.js.org/docs/v2/)         | 暂不提供             |
| teleported     | 是否使用 teleport 传至 append-to 位置 | `boolean`                                              | true                 |
| append-to      | 指示 dropdown 的内容将附加的网页元素  | `CSS 选择器` \| `HTMLElement`                          | #lu-popper-container |

#### Placement

`'top' | 'top-start'| 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' |'right-end'`

## DropdownItem API

### Attributes

| 属性名   | 说明       | 类型      | 默认值 |
| -------- | ---------- | --------- | ------ |
| disabled | 禁用该选项 | `boolean` | false  |

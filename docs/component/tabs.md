# Tabs 标签页

选项卡切换组件

## 基础用法

通过 `v-model` 绑定选中 tab，tab-pane 的 `name` 属性为其绑定值，同时可以搭配 `label` 属性为 tab-pane 命名

::: demo

tabs/basic

:::

## 标签位置

通过 `tab-position` 设置标签的位置

::: demo

tabs/tab-position

:::

## 自定义标签页

可以通过具名插槽 label 来实现自定义标签页的内容

::: demo

tabs/customized-tabs

:::

## 标签填充

通过 `stretch` 属性使标签填充容器

::: demo

tabs/stretch

:::

## Tabs API

### Attributes

| 属性名                | 说明                    | 类型                                                          | 默认值            |
| --------------------- | ----------------------- | ------------------------------------------------------------- | ----------------- |
| model-value / v-model | 绑定值，选中标签的 name | `string` \| `number`                                          | 第一个标签的 name |
| tab-position          | 选项卡所在位置          | `'top'` \| `'bottom'` \| `'left'` \| `'right'`                | top               |
| stretch               | 标签是否填充容器        | `boolean`                                                     | false             |
| before-change         | 切换标签之前的函数      | `(activeName, oldActiveName) => boolean \| Promise<boolean> ` | -                 |

### Events

| 事件名     | 说明                  | 类型                                       |
| ---------- | --------------------- | ------------------------------------------ |
| tab-click  | tab 被选中时触发      | `(pane: TabPane, evt: MouseEvent) => void` |
| tab-change | activeName 改变时触发 | `(name: TabPaneName) => void`              |

## Tab-pane API

### Attributes

| 属性名   | 说明                 | 类型                 | 默认值 |
| -------- | -------------------- | -------------------- | ------ |
| label    | 标签标题             | `string`             | -      |
| name     | 标签绑定值和默认标题 | `string` \| `number` | 下标值 |
| disabled | 是否禁用             | `boolean`            | false  |
| lazy     | 是否懒加载           | `boolean`            | false  |

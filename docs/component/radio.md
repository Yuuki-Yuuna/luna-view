---
title: Radio
---

# Radio 单选框

在一组备选项中进行单选

## 基础用法

作者采用 `v-model` 的方式实现状态切换的监听，组件的 `label` 属性为选中时的变量值, label 可以是 `String`、`Number` 或 `Boolean`

当 `v-model` 的值与 `label` 值相等即被选中，这意味着 `v-model` 的数据类型与 `label` 相同

::: demo

radio/basic

:::

## 禁用状态

`disabled` 属性可以用来控制单个单选框的禁用状态

::: demo

radio/disabled

:::

## 单选框组

在一组互斥的单选框中使用

`el-radio-group` 绑定的 `v-model` 值即为所有 `el-radio` 的 `v-model` 值

支持 `change` 事件监听以及为所有 `el-radio` 设置 `disabled` 和 `name`，此时各个 `el-radio` 设置的 `disabled` 和 `name`仍有效

::: demo

radio/group

:::

## Radio API

### Attributes

| 属性名                | 说明           | 类型                                  | 默认值 |
| --------------------- | -------------- | ------------------------------------- | ------ |
| model-value / v-model | 选中项绑定值   | `string` \| `number` \| `boolean`     | ''     |
| label                 | 单选框的值     | `string` \| `number` \| `boolean`     | ''     |
| size                  | 单选框的尺寸   | `'default'` \| `'small'` \| `'large'` | -      |
| disabled              | 是否禁用       | `boolean`                             | false  |
| name                  | 原生 name 属性 | `string`                              | -      |

### Radio Events

| 事件名 | 说明                   | 类型                                           |
| ------ | ---------------------- | ---------------------------------------------- |
| change | 绑定值变化时触发的事件 | `(value: string \| number \| boolean) => void` |

## RadioGroup API

### Attributes

| 属性名                | 说明           | 类型                                  | 默认值 |
| --------------------- | -------------- | ------------------------------------- | ------ |
| model-value / v-model | 绑定值         | `string` \| `number` \| `boolean`     | ''     |
| size                  | 单选框的尺寸   | `'default'` \| `'small'` \| `'large'` | -      |
| disabled              | 是否禁用       | `boolean`                             | false  |
| name                  | 原生 name 属性 | `string`                              | -      |

### RadioGroup Events

| 事件名 | 说明                   | 类型                                           |
| ------ | ---------------------- | ---------------------------------------------- |
| change | 绑定值变化时触发的事件 | `(value: string \| number \| boolean) => void` |

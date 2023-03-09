---
title: Button
---

# Button 按钮

常用操作按钮

## 基础用法

::: demo 使用`round`参数和`plain`参数决定按钮的风格

button/basic

:::

## 禁用状态

::: demo 使用`disabled`属性来定义按钮是否被禁用。

button/disabled

:::

## 调整尺寸

提供了`small`、`default`和`large`三种尺寸

::: demo 使用`size`属性来调整按钮大小

button/size

:::

## Button API

### Attributes

| 属性名     | 说明            | 类型                                | 默认值 |
| ---------- | --------------- | ----------------------------------- | ------ |
| size       | 尺寸            | `'large'`\| `'default'`\| `'small'` | -      |
| plain      | 是否为朴素按钮  | `boolean`                           | false  |
| round      | 是否为圆角按钮  | `boolean`                           | false  |
| circle     | 是否为圆形按钮  | `boolean`                           | false  |
| disabled   | 是否禁用        | `boolean`                           | false  |
| autoFocus  | 原生 autofoucus | `boolean`                           | false  |
| nativeType | 原生 type 属性  | `'button'`\| `'submit'`\| `'reset'` | button |

### Events

| 事件名 | 说明     | 类型                    | 默认值 |
| ------ | -------- | ----------------------- | ------ |
| click  | 点击事件 | (e: MouseEvent) => void | -      |

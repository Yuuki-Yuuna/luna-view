---
title: Slider
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，会显示当前值

通过设置 `v-model` 控制滑块的值

::: demo

slider/basic

:::

## 禁用状态

使用 `disabled` 属性控制禁用

::: demo

slider/disabled

:::

## 提示信息的显示与位置

你可以选择是否展示 Tooltip ，也能决定 Tooltip 展示的位置

::: demo

slider/placement

:::

## 垂直模式

你可以设置 `vertical` 属性改变 Slider 的方向

默认高度为 100%，也支持自己设置高度

::: demo

slider/vertical

:::

## 按钮尺寸

通过 `button-size` 属性设置 Slider 按钮尺寸，也支持设置 `show-button` 不显示按钮

::: demo

slider/button-size

:::

## Slider API

### Attributes

| 属性名                | 说明           | 类型                                  | 默认值 |
| --------------------- | -------------- | ------------------------------------- | ------ |
| model-value / v-model | 选中项绑定值   | `number`                              | -      |
| min                   | 最小值         | `number`                              | 0      |
| max                   | 最大值         | `number`                              | 100    |
| disabled              | 是否禁用       | `boolean`                             | false  |
| button-size           | 按钮尺寸       | `'default'` \| `'small'` \| `'large'` | -      |
| show-button           | 是否显示按钮   | `boolean`                             | true   |
| vertical              | 垂直模式       | `boolean`                             | false  |
| height                | 垂直模式高度   | `string`                              | -      |
| show-tooltip          | 显示提示       | `boolean`                             | true   |
| tooltip-class         | tooltip 的类名 | `string`                              | -      |
| placement             | tooltip 的位置 | `Placement`                           | -      |
| format-tooltip        | 格式化提示信息 | `(value: number) => number \| string` | -      |

#### Placement

`'top' | 'top-start'| 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' |'right-end'`

### Slider Events

| 事件名 | 说明                       | 类型                      |
| ------ | -------------------------- | ------------------------- |
| change | 值改变时触发（松开后触发） | `(value: number) => void` |
| input  | 值改变时触发（实时触发）   | `(value: number) => void` |

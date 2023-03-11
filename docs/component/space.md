---
title: Space
---

# Space 间距

需要使用间距分割容器中的元素时，使用 Space 组件可以避免为每个子元素添加边距

## 基础用法

::: demo 通过这个组件来给组件之间提供统一的间距

space/basic

:::

## 垂直布局

::: demo 支持水平方向和垂直方向两种布局方式

space/vertical

:::

## 控制间距大小

通过调整 `gap` 的值来控制间距的大小

你可以使用内置的 `small` 、`default` 、`large` 来设置间距大小，分别对应 `6px` 、`10px` 和 `14px` 的间距

::: demo

space/control-size

:::

## 自定义间距大小

可以通过传入自己定义 `number` 类型的大小来设置, 也可以传入一个 `[number, number]` 类型详细指定竖直和水平方向

::: demo

space/customized-size

:::

## 自动换行

水平(horizontal)模式下，通过 `wrap` 属性控制换行

::: demo

space/auto-wrap

:::

## 对齐方式

设置该值可以调整所有子节点在容器内的对齐方式，通过 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 实现

使用 `alignment` 属性进行对齐

::: demo

space/alignment

:::

## Space API

### Attributes

| 属性名    | 说明                 | 类型                                                                    | 默认值     |
| --------- | -------------------- | ----------------------------------------------------------------------- | ---------- |
| alignment | 对齐方式             | `'start'` \| `'center'` \| `'end'`                                      | center     |
| direction | 间距方向             | `'vertical'` \| `'horizontal'`                                          | horizontal |
| gap       | 间距大小             | `'small'` \| `'default'` \| `'large'` \| `number` \| `[number, number]` | -          |
| wrap      | 水平模式是否自动换行 | `boolean`                                                               | false      |

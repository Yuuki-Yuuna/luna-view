# Scrollbar 滚动条

用于替换浏览器原生滚动条

## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应

tips: 滚动条没有占体积，而是定位在最右侧，可通过设置右边距留出位置

::: demo

scrollbar/basic

:::

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

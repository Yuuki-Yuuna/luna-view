# Icon 图标

一些的图标集合

Icon 直接搬运自 [element-plus-icons](https://github.com/element-plus/element-plus-icons)

## 使用方法

参考此处：https://element-plus.gitee.io/zh-CN/component/icon.html

这里给出一个简单示例

```vue
<template>
  <div>
    <!-- 配合 lu-icon 使用 -->
    <lu-icon :size="size" :color="color">
      <Edit />
    </lu-icon>
    <!-- 或者独立使用它，不从父级获取属性 -->
    <Edit />
  </div>
</template>
```

## Icon API

### Attributes

| 属性名 | 说明                        | 类型                 | 默认值  |
| ------ | --------------------------- | -------------------- | ------- |
| color  | svg 的 fill 颜色            | `string`             | inherit |
| size   | svg 图标的大小，size x size | `string` \| `number` | inherit |

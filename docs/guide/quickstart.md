---
title: 快速开始
---

# 快速开始

本节将介绍如何在项目中使用 Luna View

## 安装

### 环境支持

请在支持 Vue3 的浏览器环境下使用

### 通过包管理器安装

Luna View 已发布至 NPM，运行以下命令安装

```bash
# 选择一个你喜欢的包管理器

# NPM
npm install luna-view

# Yarn
yarn add luna-view

# pnpm
pnpm install luna-view
```

## 用法

### 完整引入

忽略打包后文件大小时，我们以完整导入的形式更方便的使用

```ts
import { createApp } from 'vue'
import LunaView from 'luna-view' //main.ts中全局引入组件
import 'luna-view/theme/index.css' //引入样式
import App from './App.vue'

const app = createApp(App)

app.use(LunaView)

app.mount('#app')
```

但很显然，使用完整引入并不能为你提供类型检查

### 按需引入

需要优化打包后文件大小时，你可以使用按需引入

同时，按需引入能为你提供完整的类型检查，这也是作者推荐的

```vue
<template>
  <lu-button>这里是Button组件</lu-button>
</template>

<script setup>
import { LuButton } from 'luna-view'
</script>
```

值得注意得是，样式文件仍然需要全局引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'luna-view/theme/index.css' //在main.ts中引入样式

const app = createApp(App)

app.use(LunaView)

app.mount('#app')
```

### 开始使用

现在你可以启动项目了。 具体每个组件的使用方法, 请查阅 每个组件的<a href="/component/button" target="_blank">文字描述</a>

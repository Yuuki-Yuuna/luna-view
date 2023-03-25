# Video 影像

简易的视频播放器

::: tip

在 SSR ([Nuxt](https://nuxt.com/blog/v3))和 SSG ([VitePress](https://vitepress.dev/))场景下，你需要将组件包裹在 `<client-only></client-only>` 中

:::

## 基本用法

通过 `src` 属性设置视频播放地址，通过 `v-model` 属性绑定进度条

::: demo

video/basic

:::

## 影子进度条

通过 `shadow-progress` 属性决定是否显示影子进度条，默认为 true

::: demo

video/shadow-progress

:::

## Vedio API

### Attributes

| 属性名                | 说明           | 类型      | 默认值 |
| --------------------- | -------------- | --------- | ------ |
| model-value / v-model | 进度绑定值     | `number`  | 0      |
| shadow-progress       | 显示影子进度条 | `boolean` | true   |

### Events

| 事件名 | 说明                           | 类型                      |
| ------ | ------------------------------ | ------------------------- |
| change | 进度条改变时触发（松开后触发） | `(value: number) => void` |
| input  | 进度条改变时触发（实时触发）   | `(value: number) => void` |

### Exposes

| 名称     | 说明              | 类型               |
| -------- | ----------------- | ------------------ |
| vedioRef | vedio 的 DOM 节点 | `HTMLVideoElement` |
| play     | 播放/暂停方法     | `() => void`       |

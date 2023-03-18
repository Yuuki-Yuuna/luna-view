# Dialog 对话框

弹出自定义内容

::: tip

在 SSR ([Nuxt](https://nuxt.com/blog/v3))和 SSG ([VitePress](https://vitepress.dev/))场景下，您需要将组件包裹在 `<client-only></client-only>` 中

:::

## 基础用法

需要设置 `v-model` 属性，它接收 `blooean` 类型，用于控制 Dialog 显示，Dialog 分为 header、 body 和 footer 三部分，其中 body 为默认插槽，header 和 footer 为对应的具名插槽

弹出的内容是完全自定义的，例如你可以制作一个全屏弹出的确认框

::: demo

dialog/basic

:::

## 自定义头部

作者提供了 `title` 属性决定标题文字的内容，当然，你可以使用 header 插槽来自定义你想要展示在 header 中的内容

值得注意的是，使用 header 插槽后原本的 header 中关闭按钮相关的功能将失效

::: demo

dialog/customized-header

:::

## 内容居中

通过设置 `center` 属性，我们可以将对话框的 `title` 和 `footer` 居中，但请注意， `body` 部分并不会居中

::: demo

dialog/center

:::

## 对话框居中

从屏幕中心打开对话框

设置 `align-center` 为 true 使对话框水平垂直居中，由于 flex 的缘故会使 `top` 属性失效

::: demo

dialog/align-center

:::

## 锁定滚动条

默认在对话框弹出时锁定滚动条，你也可以解除锁定

使用 `lockScroll` 属性控制，默认为 true

::: demo

dialog/lock-scroll

:::

<VpTips name="resona">

滚动条会占据一定宽度，锁定滚动时，作者采用了修改 body 宽度的方式保留了消失滚动条的宽度，使用时请注意 body 标签的宽度不再是屏幕宽度

</VpTips>

## 可拖拽对话框

header 部分变为可拖拽区域，实现 Dialog 拖拽

设置 `draggable` 属性为 true 以做到拖拽

::: demo

dialog/draggable

:::

## Dialog API

### Attributes

| 属性名                | 说明                                                           | 类型                                   | 默认值 |
| --------------------- | -------------------------------------------------------------- | -------------------------------------- | ------ |
| model-value / v-model | 是否显示 Dialog                                                | `boolean`                              | -      |
| title                 | 标题文字                                                       | `string`                               | -      |
| width                 | dialog 宽度                                                    | `string` \| `number`                   | -      |
| top                   | dialog 中 margin-top 的值                                      | `string` \| `number`                   | 15vh   |
| custom-class          | dialog 的自定义类名                                            | `string`                               | -      |
| modal                 | 是否需要遮罩层                                                 | `boolean`                              | true   |
| modal-class           | 遮罩层的自定义类名                                             | `string`                               | -      |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 dialog                             | `boolean`                              | true   |
| show-close            | 是否显示关闭按钮                                               | `boolean`                              | true   |
| before-close          | 关闭前的回调, 回调函数内执行 done 参数方法才真正关闭对话框     | `Function(done)`(done 用来关闭 dialog) | -      |
| draggable             | 为 dialog 启用可拖拽功能                                       | `boolean`                              | false  |
| center                | 居中排列 dialog 的 header 和 footer 部分                       | `boolean`                              | false  |
| align-center          | 是否水平垂直对齐对话框                                         | `boolean`                              | false  |
| lock-scroll           | 具有 dialog 时锁定 body 滚动                                   | `boolean`                              | true   |
| destroy-on-close      | 关闭 dialog 时，销毁其中的元素                                 | `boolean`                              | false  |
| open-delay            | dialog 打开的延时，单位毫秒                                    | `number`                               | 0      |
| close-delay           | dialog 关闭的延时，单位毫秒                                    | `number`                               | 0      |
| append-to-body        | 自身是否插入至 body 元素上。 嵌套 dialog 必须指定该属性为 true | `boolean`                              | false  |

### Events

| 事件名 | 说明                      | 类型         |
| ------ | ------------------------- | ------------ |
| open   | dialog 打开时触发         | `() => void` |
| opened | dialog 打开动画结束时触发 | `() => void` |
| close  | dialog 关闭时触发         | `() => void` |
| closed | dialog 关闭动画结束时触发 | `() => void` |

# Message 消息提示

全局展示操作反馈信息

## 基础用法

提示从顶部出现，3 秒后自动消失

消息内容支持字符串和 VNode 节点

<VpTips name="luna">

作为 plugin 引入时， lu-message 会注册一个全局的 `$message` 方法用于调用

</VpTips>

::: demo

message/basic

:::

## 不同状态

用来显示「成功、 提示、警告、错误」类的操作反馈

通过 `type` 属性设置状态，也可以调用状态函数

::: demo

message/different-types

:::

## 可关闭的

通过 `showClose` 属性设置是否能够手动关闭，默认为 false

此外，可以通过 `duration` 属性设置消息提示的持续时间，默认为 3000 毫秒，如果设置为 0，则永久显示，只能手动关闭

::: demo

message/closeable

:::

## 文字居中

通过 `center` 属性设置文字是否居中，默认为 false

::: demo

message/center-content

:::

## HTML 消息

`message` 还支持使用 HTML 字符串作为正文内容

将 `dangerouslyUseHTML` 属性设置为 true，message 就会被当作 HTML 片段处理

::: demo

message/dangerouslyUseHTML

:::

<VpTips name="asahi">

敬请注意，在网站上动态渲染任意 HTML 是非常危险的，在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，永远不要将用户提交的内容赋值给 `message` 属性

</VpTips>

## 分组消息合并

合并相同内容的消息

设置 `grouping` 为 true，内容相同的 `message` 将被合并

::: demo

message/grouping

:::

## Message API

### Attributes

| 属性名             | 说明                                        | 类型                                                | 默认值        |
| ------------------ | ------------------------------------------- | --------------------------------------------------- | ------------- |
| message            | 消息文字                                    | `string` \| `VNode` \| `() => VNode`                | -             |
| type               | 消息类型                                    | `'success'` \| `'warning'` \| `'info'` \| `'error'` | info          |
| icon               | 自定义图标，该属性会覆盖 type 的图标        | `string ` \| `Component`                            | -             |
| changeTextColor    | 改变文字颜色                                | `boolean`                                           | true          |
| dangerouslyUseHTML | 是否将 message 属性作为 HTML 片段处理       | `boolean`                                           | false         |
| custom-class       | 自定义类名                                  | `string`                                            | -             |
| duration           | 显示时间，单位为毫秒。设为 0 则不会自动关闭 | `number`                                            | 3000          |
| show-close         | 是否显示关闭按钮                            | `boolean`                                           | false         |
| center             | 文字是否居中                                | `boolean`                                           | false         |
| on-close           | 关闭时的回调函数                            | `() => void`                                        | -             |
| offset             | 消息距离窗口顶部的偏移量                    | `number`                                            | 20            |
| appendTo           | 设置组件的根元素                            | `string` \| `HTMLElement`                           | document.body |
| grouping           | 合并内容相同的消息，不支持 VNode 类型的消息 | `boolean`                                           | false         |

### Methods

调用 lu-essage 或 `$message` 会返回关闭该实例的方法。此外，也存在 lu-message 的静态方法

| 方法名   | 类型                          | 说明                                                            |
| -------- | ----------------------------- | --------------------------------------------------------------- |
| close    | `() => void`                  | 返回的方法，关闭当前实例                                        |
| closeAll | `(type?: MessageType) => void` | 静态方法，关闭传入类型的所有消息，不传入则为所有类型 |

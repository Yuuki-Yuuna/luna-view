# Badge 徽章

按钮和图标上的数字或状态标记

## 基础用法

可以用来展示新消息的数量

通过 `value` 属性设置显示，支持字符串和数字

::: demo

badge/basic

:::

## 颜色风格

通过 `type` 属性改变 Badge 颜色风格

::: demo

badge/type

:::

## 最大值

你还可以自定义最大值

再数字值超过最大值时，将通过加号展示数据

::: demo

badge/max

:::

## 小红点

当你不想展示任何数据时，可以开启小红点

使用 `is-dot` 属性开启小红点模式

::: demo

badge/is-dot

:::

## Badge API

### Attributes

| 属性名 | 说明                                  | 类型                 | 默认值 |
| ------ | ------------------------------------- | -------------------- | ------ |
| value  | 显示值                                | `number` \| `string` | -      |
| max    | 超过最大值会显示 {max}+, 数字类型限定 | `number`             | 99     |
| is-dot | 只显示小圆点                          | `boolean`            | false  |
| hidden | 是否隐藏 badge                        | `boolean`            | false  |
| type   | badge 颜色风格                        | `BadgeType`          | danger |

#### BadgeType

`'primary' | 'success' | 'info' | 'warning' | 'error' | 'danger'`

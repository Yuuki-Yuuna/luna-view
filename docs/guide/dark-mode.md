# 夜间模式

Luna View 附有一套夜间模式的配色（虽然整体颜色变化几乎没有就是了）

通过修改 cssVar 实现夜间模式

## 使用方式

为 html 标签设置`class="dark"`的类名即可启用夜间模式配色

```html
<html class="dark">
  <head></head>
  <body></body>
</html>
```

如果想要动态切换，可以选择自行操作 html 的类名，或使用[Vueuse](https://vueuse.org/)

## 自定义主题

可以通过覆盖`html.dark`下的 css 变量实现样式的统一替换

```css
html.dark {
  /* 自定义深色背景颜色 */
  --el-bg-color: #626aef;
}
```

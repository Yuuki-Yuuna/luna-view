module.exports = {
  printWidth: 100, //最大单行长度
  tabWidth: 2, //每个缩进的空格数
  useTabs: false, //使用制表符而不是空格缩进行
  semi: false, //在语句的末尾打印分号
  singleQuote: true, //使用单引号而不是双引号
  trailingComma: 'none', //在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  arrowParens: 'always', //箭头函数只有一个参数的时候是否使用括号 always：使用  avoid： 省略
  endOfLine: 'auto' //自动调整lf换行和crlf换行
  // tslintIntegration: false //不让ts使用prettier校验,
}

const guideSidebar = [
  {
    text: '快速开始',
    link: '/guide/quickstart'
  },
  {
    text: '夜间模式',
    link: '/guide/dark-mode'
  }
]

const componentSidebar = [
  {
    text: '基础组件',
    items: [
      {
        text: 'Button 按钮',
        link: '/component/button'
      },
      {
        text: 'Space 间距',
        link: '/component/space'
      }
    ]
  }
]

export const sidebar = {
  '/guide/': guideSidebar,
  '/component/': componentSidebar
}

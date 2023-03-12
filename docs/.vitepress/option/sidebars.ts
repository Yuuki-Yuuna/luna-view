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
  },
  {
    text: '表单组件',
    items: [
      {
        text: 'Radio 单选框',
        link: '/component/radio'
      },
      {
        text: 'Slider 滑块',
        link: '/component/slider'
      }
    ]
  },
  {
    text: '反馈组件',
    items: [
      {
        text: 'Tooltip 文字提示',
        link: '/component/tooltip'
      }
    ]
  }
]

export const sidebar = {
  '/guide/': guideSidebar,
  '/component/': componentSidebar
}

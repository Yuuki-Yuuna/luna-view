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
        text: 'Icon 图标',
        link: '/component/icon'
      },
      {
        text: 'Space 间距',
        link: '/component/space'
      },
      {
        text: 'Divider 分割线',
        link: '/component/divider'
      },
      {
        text: 'Scrollbar 滚动条',
        link: '/component/scrollbar'
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
    text: '导航组件',
    items: [
      {
        text: 'Dropdown 下拉菜单',
        link: '/component/dropdown'
      },
      {
        text: 'Tabs 标签页',
        link: '/component/tabs'
      }
    ]
  },
  {
    text: '数据展示',
    items: [
      {
        text: 'Badge 徽章',
        link: '/component/badge'
      }
    ]
  },
  {
    text: '反馈组件',
    items: [
      {
        text: 'Dialog 对话框',
        link: '/component/dialog'
      },
      {
        text: 'Message 消息提示',
        link: '/component/message'
      },
      {
        text: 'Popover 气泡卡片',
        link: '/component/popover'
      },
      {
        text: 'Tooltip 文字提示',
        link: '/component/tooltip'
      }
    ]
  },
  {
    text: '其它组件',
    items: [
      {
        text: 'Video 影像',
        link: '/component/video'
      }
    ]
  }
]

export const sidebar = {
  '/guide/': guideSidebar,
  '/component/': componentSidebar
}

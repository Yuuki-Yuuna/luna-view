import Components from './component'
import { makeinstaller } from './make-installer'

export * from '@luna-view/components' //分别引入所有组件

const LunaView = makeinstaller(Components) //全局引入所有组件

export default LunaView

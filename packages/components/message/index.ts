import { withInstallFunction } from '@luna-view/utils'
import Message from './src/method'

export const LuMessage = withInstallFunction(Message, '$message')
export default LuMessage

export * from './src/message'

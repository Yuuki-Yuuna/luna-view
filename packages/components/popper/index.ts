import { withInstall } from '@luna-view/utils'
import Popper from './src/popper.vue'
import LuPopperArrow from './src/arrow.vue'
import LuPopperTrigger from './src/trigger.vue'
import LuPopperContent from './src/content.vue'

export { LuPopperArrow, LuPopperTrigger, LuPopperContent }

export const LuPopper = withInstall(Popper)
export default LuPopper

export * from './src/popper'
export * from './src/trigger'
export * from './src/content'
export * from './src/arrow'

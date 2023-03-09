import { withInstall, withNoopInstall } from '@luna-view/utils'

import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'

export const LuRadio = withInstall(Radio, { RadioGroup })
export default LuRadio

export const LuRadioGroup = withNoopInstall(RadioGroup)

export * from './src/radio'
export * from './src/radio-group'

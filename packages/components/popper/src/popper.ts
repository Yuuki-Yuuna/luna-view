import type Popper from './popper.vue'

const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export type PopperTrigger = (typeof triggers)[number]

export type PopperInstance = InstanceType<typeof Popper>

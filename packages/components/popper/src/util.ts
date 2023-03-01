import type { Modifier } from '@popperjs/core'
import type { PopperCoreConfigProps } from './content'

export const buildPopperOptions = (
  props: PopperCoreConfigProps,
  modifiers: Modifier<any, any>[] = []
) => {
  const { placement, strategy, popperOptions } = props

  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers] as Partial<Modifier<any, any>>[]
  }

  if (popperOptions.modifiers) {
    options.modifiers = [...options.modifiers, ...popperOptions.modifiers]
  }

  return options
}

// popper.js内置的modifier
const genModifiers = (props: PopperCoreConfigProps) => {
  const { offset, fallbackPlacements } = props
  return [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12]
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: 'computeStyles',
      options: {
        adaptive: false,
        gpuAcceleration: false
      }
    }
  ]
}

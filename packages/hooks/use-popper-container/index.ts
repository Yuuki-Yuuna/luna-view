import { onBeforeMount } from 'vue'
import { defaultNamespace } from '../use-namespace'

let cachedContainer: HTMLElement

export const usePopperContainerSelector = () => `#${defaultNamespace}-popper-container`

export const createPopperContainer = () => {
  const container = document.createElement('div')
  container.id = `${defaultNamespace}-popper-container`
  document.body.appendChild(container)
  return container
}

export const usePopperContainer = () => {
  const selector = usePopperContainerSelector()

  onBeforeMount(() => {
    if (!cachedContainer && !document.querySelector(selector)) {
      cachedContainer = createPopperContainer()
    }
  })
}

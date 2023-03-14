import { computed, ref } from 'vue'

const zIndex = ref(0)

export const useZIndex = () => {
  const currentZIndex = computed(() => zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    currentZIndex,
    nextZIndex
  }
}

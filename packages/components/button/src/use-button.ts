import { ref } from 'vue'
import type { SetupContext } from 'vue'
import type { ButtonEmits, ButtonProps } from './button'

export const useButton = (props: ButtonProps, emit: SetupContext<ButtonEmits>['emit']) => {
  const _ref = ref<HTMLButtonElement>()

  const handleClick = (evt: MouseEvent) => {
    emit('click', evt)
  }

  return { _ref, handleClick }
}

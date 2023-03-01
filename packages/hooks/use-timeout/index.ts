//闭包保证只有一个定时器
export const useTimeout = () => {
  let timeoutHandler: number

  const cancelTimeout = () => window.clearTimeout(timeoutHandler)

  const registerTimeout = (fn: (...args: any[]) => any, delay: number) => {
    cancelTimeout()
    timeoutHandler = window.setTimeout(fn, delay)
  }

  return {
    registerTimeout,
    cancelTimeout
  }
}

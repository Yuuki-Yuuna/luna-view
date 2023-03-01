import { buildRoot } from '@luna-view/build-config'
import { run } from './process'

import type { TaskFunction } from 'gulp'

type WithTaskName = <T extends TaskFunction>(name: string, fn: T) => T & { taskName: string }

//为进程命名
export const withTaskName: WithTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { taskName: name }) //返回新对象

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () => run(`pnpm run build ${name}`, buildRoot))

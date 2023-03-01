import path from 'path'
import { copyFile } from 'fs/promises'
import { copy } from 'fs-extra'
import { parallel, series } from 'gulp'
import { buildOutput, lvOutput, lvPackage, projRoot } from '@luna-view/build-config'
import { run, runTask, withTaskName } from './src'

import type { TaskFunction } from 'gulp'

export const copyTypesDefinitions = () => {
  const src = path.resolve(buildOutput, 'types', 'packages')

  return copy(src, lvOutput)
}

export const copyFiles = () =>
  Promise.all([
    copyFile(lvPackage, path.join(lvOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(lvOutput, 'README.md'))
  ])

const order: TaskFunction = series(
  withTaskName('clean', () => run('pnpm run clean')),
  parallel(
    runTask('buildModules'),
    runTask('generateTypesDefinitions'),
    withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme build'))
  ),
  parallel(copyTypesDefinitions, copyFiles)
)

export default order

export * from './src'

import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const buildRoot = resolve(projRoot, 'build')
export const lvRoot = resolve(pkgRoot, 'luna-view')

export const buildOutput = resolve(projRoot, 'dist')
export const lvOutput = resolve(buildOutput, 'luna-view') //luna-view output
export const lvPackage = resolve(lvRoot, 'package.json')

export const docRoot = resolve(projRoot, 'docs')
export const vpRoot = resolve(docRoot, '.vitepress')

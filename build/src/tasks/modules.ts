import { rollup } from 'rollup'
import glob from 'fast-glob'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import {
  excludeFiles,
  getPackageDependencies,
  lvOutput,
  lvPackage,
  lvRoot,
  pkgRoot
} from '@luna-view/build-config'

import type { Plugin } from 'rollup'

// 因为还要生成.d.ts，只好用API方式打包了
export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js?(x),ts?(x),vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const generateExternal = () => {
    const { dependencies, peerDependencies } = getPackageDependencies(lvPackage)

    return [...dependencies, ...peerDependencies]
  }

  const bundle = await rollup({
    input,
    plugins: [
      DefineOptions() as Plugin, //这个必须放vue前面
      vueJsx() as Plugin,
      vue() as Plugin,
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts'
        }
      })
    ],
    treeshake: false,
    external: generateExternal()
  })

  bundle.write({
    dir: lvOutput,
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: lvRoot,
    sourcemap: true
  })
}

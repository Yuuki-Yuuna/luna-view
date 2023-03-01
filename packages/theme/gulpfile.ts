import path from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import { dest, series, src } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import { lvOutput } from '@luna-view/build-config'

import type { TaskFunction } from 'gulp'

const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(lvOutput, 'theme')

//打包scss为css
const buildTheme = () => {
  const sass = gulpSass(dartSass)
  const noElPrefixFile = /(index|base|display)/
  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `lu-${path.basename}`
        }
      })
    )
    .pipe(dest(distFolder))
}

//复制打包后的css代码
export const copyThemeChalkBundle = () => {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

export const build: TaskFunction = series(buildTheme, copyThemeChalkBundle)

export default build

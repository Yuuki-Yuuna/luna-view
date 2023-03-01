import path from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import * as vueCompiler from 'vue/compiler-sfc'
import glob from 'fast-glob'
import { Project } from 'ts-morph'
import chalk from 'chalk'
import consola from 'consola'
import { buildOutput, excludeFiles, lvRoot, pkgRoot, projRoot } from '@luna-view/build-config'

import type { CompilerOptions, SourceFile } from 'ts-morph'

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.web.json')
const outDir = path.resolve(buildOutput, 'types')

export const generateTypesDefinitions = async () => {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true
  })

  const sourceFiles = await addSourceFiles(project)
  consola.success('Added source files')

  typeCheck(project)
  consola.success('Type check passed!')

  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath())
    consola.trace(chalk.yellow(`Generating definition for file: ${chalk.bold(relativePath)}`))

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${chalk.bold(relativePath)}`)
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await mkdir(path.dirname(filepath), {
        recursive: true
      })

      const pathRewriter = () => {
        return (id: string) => {
          id = id.replaceAll('@luna-view/theme', 'luna-view/theme')
          id = id.replaceAll('@luna-view/', 'luna-view/')
          return id
        }
      }

      await writeFile(filepath, pathRewriter()(outputFile.getText()), 'utf8')

      consola.success(chalk.green(`Definition for file: ${chalk.bold(relativePath)} generated`))
    })

    await Promise.all(subTasks)
  })

  await Promise.all(tasks)
}

const addSourceFiles = async (project: Project) => {
  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!luna-view/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const lvPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: lvRoot,
      onlyFiles: true
    })
  )

  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        const hasTsNoCheck = content.includes('@ts-nocheck')

        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...lvPaths.map(async (file) => {
      const content = await readFile(path.resolve(lvRoot, file), 'utf-8')
      sourceFiles.push(project.createSourceFile(path.resolve(pkgRoot, file), content))
    })
  ])

  return sourceFiles
}

const typeCheck = (project: Project) => {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
}

import path from 'path'

import type { Plugin } from 'vite'

export const MarkdownTransform = (): Plugin => {
  return {
    name: 'luna-view-md-transform',
    enforce: 'pre',
    //code是文件内容，id是路径
    async transform(code, id) {
      if (!id.endsWith('.md')) {
        return
      }
      const componentId = path.basename(id, '.md')
      //这里的相对路径，相对于md文件，即component文件夹下xxx.md
      const scriptSetups = [
        `const demos = import.meta.globEager('../examples/${componentId}/*.vue')`,
      ]

      return combineMarkdown(code, [combineScriptSetup(scriptSetups)])
    }
  }
}

const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join('\n')}
</script>\n
`
const combineMarkdown = (code: string, headers: string[]) => {
  const frontmatterEnds = code.indexOf('---\n\n')
  code = code.slice(0, frontmatterEnds) + headers.join('\n') + code.slice(frontmatterEnds)
  return code
}

export default MarkdownTransform

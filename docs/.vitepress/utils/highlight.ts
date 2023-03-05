import hljs from 'highlight.js'

export const wrap = (code: string) => {
  return `<pre v-pre><code>${code}</code></pre>`
}

export const highlight = (str: string) => {
  return hljs.highlightAuto(str).value
}

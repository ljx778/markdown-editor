import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  breaks: true,
  gfm: true
})

const renderer = new marked.Renderer()

renderer.code = function(code: string, lang: string | undefined) {
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  const highlighted = hljs.highlight(code, { language }).value
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
}

marked.use({ renderer })

export function parseMarkdown(text: string): string {
  return marked.parse(text) as string
}

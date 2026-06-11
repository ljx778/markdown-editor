export function exportAsMarkdown(content: string, filename: string = 'document.md'): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  downloadBlob(blob, filename)
}

export function exportAsHTML(content: string, filename: string = 'document.html'): void {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename.replace('.html', '')}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.8;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #24292e;
    }
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      margin-bottom: 0.5em;
    }
    h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.85em; color: #6a737d; }
    p { margin-bottom: 1em; }
    ul, ol { padding-left: 2em; margin-bottom: 1em; }
    li { margin-bottom: 0.25em; }
    blockquote { padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5; margin-bottom: 1em; }
    code { padding: 0.2em 0.4em; font-size: 85%; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace; }
    pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #f6f8fa; border-radius: 6px; margin-bottom: 1em; }
    pre code { padding: 0; background-color: transparent; }
    table { border-spacing: 0; border-collapse: collapse; margin-bottom: 1em; width: 100%; }
    table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }
    table th { font-weight: 600; background-color: #f6f8fa; }
    table tr:nth-child(2n) { background-color: #f6f8fa; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    hr { height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0; }
    img { max-width: 100%; }
  </style>
</head>
<body>
${content}
</body>
</html>`
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  downloadBlob(blob, filename)
}

export function exportAsPDF(content: string, filename: string = 'document.pdf'): void {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    return
  }

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename.replace('.pdf', '')}</title>
  <style>
    @media print {
      body { font-size: 14px; }
      @page { margin: 2cm; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.8;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #24292e;
    }
    h1, h2, h3, h4, h5, h6 { font-weight: 600; margin-bottom: 0.5em; }
    h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.85em; color: #6a737d; }
    p { margin-bottom: 1em; }
    ul, ol { padding-left: 2em; margin-bottom: 1em; }
    li { margin-bottom: 0.25em; }
    blockquote { padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5; margin-bottom: 1em; }
    code { padding: 0.2em 0.4em; font-size: 85%; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace; }
    pre { padding: 16px; overflow: auto; font-size: 12px; line-height: 1.45; background-color: #f6f8fa; border-radius: 6px; margin-bottom: 1em; }
    pre code { padding: 0; background-color: transparent; }
    table { border-spacing: 0; border-collapse: collapse; margin-bottom: 1em; width: 100%; }
    table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }
    table th { font-weight: 600; background-color: #f6f8fa; }
    table tr:nth-child(2n) { background-color: #f6f8fa; }
    a { color: #0366d6; text-decoration: none; }
    hr { height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0; }
    img { max-width: 100%; }
  </style>
</head>
<body>
${content}
<script>
  window.onload = function() {
    window.print();
    window.close();
  };
</script>
</body>
</html>`

  printWindow.document.write(html)
  printWindow.document.close()
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

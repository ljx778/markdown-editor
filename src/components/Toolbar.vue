<script setup lang="ts">
import { List, Link, Picture, Minus } from '@element-plus/icons-vue'

interface ToolItem {
  icon?: string
  action: string
  wrap?: boolean
  endAction?: string
  title: string
  type?: string
  comp?: typeof List
}

const emit = defineEmits<{
  (_e: 'insert', _format: string, _wrap?: boolean, _endAction?: string): void
}>()

const tools: ToolItem[] = [
  { icon: 'bold', action: '**', wrap: true, title: '加粗' },
  { icon: 'italic', action: '_', wrap: true, title: '斜体' },
  { icon: 'underline', action: '<u>', wrap: true, endAction: '</u>', title: '下划线' },
  { icon: 'strikethrough', action: '~~', wrap: true, title: '删除线' },
  { type: 'divider' as const, action: '', title: '' },
  { icon: 'h1', action: '# ', wrap: false, title: '标题1' },
  { icon: 'h2', action: '## ', wrap: false, title: '标题2' },
  { icon: 'h3', action: '### ', wrap: false, title: '标题3' },
  { type: 'divider' as const, action: '', title: '' },
  { icon: 'list', action: '- ', wrap: false, title: '无序列表', comp: List },
  { icon: 'ol', action: '1. ', wrap: false, title: '有序列表' },
  { icon: 'quote', action: '> ', wrap: false, title: '引用' },
  { type: 'divider' as const, action: '', title: '' },
  { icon: 'code', action: '`', wrap: true, title: '行内代码' },
  { icon: 'codeblock', action: '```\n', wrap: false, endAction: '\n```', title: '代码块' },
  { type: 'divider' as const, action: '', title: '' },
  { icon: 'link', action: '[', wrap: false, endAction: '](url)', title: '链接', comp: Link },
  { icon: 'image', action: '![', wrap: false, endAction: '](url)', title: '图片', comp: Picture },
  { icon: 'table', action: '| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |', wrap: false, title: '表格' },
  { icon: 'hr', action: '\n---\n', wrap: false, title: '分隔线', comp: Minus }
]

function handleClick(tool: ToolItem) {
  if (tool.type === 'divider') return
  emit('insert', tool.action, tool.wrap, tool.endAction)
}

function getIcon(icon: string) {
  const icons: Record<string, string> = {
    bold: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h6a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h10a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>`,
    italic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4h6v16H8"/><path d="M11 15h6M11 9h6"/></svg>`,
    underline: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12"/><path d="M4 20h16"/><path d="M4 12h16"/></svg>`,
    strikethrough: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3H7"/><path d="M17 21H7"/><path d="M4 12h16"/></svg>`,
    h1: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>`,
    h2: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h6"/></svg>`,
    h3: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h10"/><path d="M4 12h16"/><path d="M4 18h6"/></svg>`,
    ol: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M9 6v0M9 12v0M9 18v0"/></svg>`,
    quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 16V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M20 16V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="19" x2="15" y2="19"/></svg>`,
    codeblock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/><line x1="15" y1="17" x2="15" y2="15"/></svg>`,
    table: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/><path d="M10 4v16"/><path d="M14 4v16"/></svg>`
  }
  return icons[icon] || ''
}
</script>

<template>
  <div class="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <template
      v-for="(item, index) in tools"
      :key="index"
    >
      <div
        v-if="item.type === 'divider'"
        class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"
      />
      <button
        v-else
        class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        :title="item.title"
        @click="handleClick(item)"
      >
        <component
          :is="item.comp"
          v-if="item.comp"
          class="w-4 h-4"
        />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span
          v-else
          class="w-4 h-4 inline-block"
          v-html="getIcon(item.icon || '')"
        />
      </button>
    </template>
  </div>
</template>

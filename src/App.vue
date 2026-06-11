<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Moon, Sunny, FullScreen, ScaleToOriginal, Download, Document } from '@element-plus/icons-vue'
import Editor from '@/components/Editor.vue'
import Preview from '@/components/Preview.vue'
import Toolbar from '@/components/Toolbar.vue'
import { exportAsMarkdown, exportAsPDF } from '@/utils/export'
import { parseMarkdown } from '@/utils/mdParser'

const content = ref('')
const isDark = ref(false)
const isFullscreen = ref(false)
const showStats = ref(false)
const editorRef = ref<InstanceType<typeof Editor> | null>(null)
const renderedContent = ref('')

const STORAGE_KEY_DARK = 'markdown-editor-dark'

onMounted(() => {
  const savedDark = localStorage.getItem(STORAGE_KEY_DARK)
  isDark.value = savedDark === 'true'
  updateTheme()
  if (document.fullscreenEnabled) {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
  }
  debouncedRender()
})

onUnmounted(() => {
  if (document.fullscreenEnabled) {
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }
})

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY_DARK, String(isDark.value))
  updateTheme()
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

function handleExport(type: 'md' | 'pdf') {
  if (type === 'md') {
    exportAsMarkdown(content.value)
  } else {
    const html = renderedContent.value || parseMarkdown(content.value)
    exportAsPDF(html)
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

function debouncedRender() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    renderedContent.value = parseMarkdown(content.value || '# 欢迎使用 Markdown 编辑器\n\n开始编写你的文档吧！')
  }, 100)
}

watch(content, () => {
  debouncedRender()
})

function handleInsert(format: string, wrap?: boolean, endAction?: string) {
  editorRef.value?.focus()
  const textarea = document.querySelector('.editor-textarea') as HTMLTextAreaElement
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = content.value.substring(start, end)
  let newText: string

  if (wrap) {
    newText = content.value.substring(0, start) +
      format + selectedText + (endAction || format) +
      content.value.substring(end)
  } else {
    newText = content.value.substring(0, start) +
      format + selectedText + (endAction || '') +
      content.value.substring(end)
  }

  content.value = newText

  setTimeout(() => {
    const newCursorPos = selectedText
      ? start + format.length + selectedText.length + (endAction?.length || format.length)
      : start + format.length
    textarea.setSelectionRange(newCursorPos, newCursorPos)
    textarea.focus()
  }, 0)
}

const stats = computed(() => {
  const text = content.value
  const charCount = text.length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const lineCount = text.split('\n').length
  return { charCount, wordCount, lineCount }
})
</script>

<template>
  <div
    class="h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300"
    :class="{ 'fullscreen': isFullscreen }"
  >
    <header class="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <Document class="w-6 h-6 text-primary-500" />
        <h1 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Markdown Editor
        </h1>
      </div>
      
      <div class="flex items-center gap-2">
        <button
          v-if="showStats"
          class="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <span class="flex items-center gap-2">
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
            </svg>
            <span>{{ stats.charCount }} 字符</span>
            <span>{{ stats.wordCount }} 单词</span>
            <span>{{ stats.lineCount }} 行</span>
          </span>
        </button>
        
        <button
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
          title="字数统计"
          @click="showStats = !showStats"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
          </svg>
        </button>
        
        <button
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
          :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
          @click="toggleDark"
        >
          <Sunny
            v-if="isDark"
            class="w-5 h-5"
          />
          <Moon
            v-else
            class="w-5 h-5"
          />
        </button>
        
        <button
          class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
          :title="isFullscreen ? '退出全屏' : '全屏模式'"
          @click="toggleFullscreen"
        >
          <ScaleToOriginal
            v-if="isFullscreen"
            class="w-5 h-5"
          />
          <FullScreen
            v-else
            class="w-5 h-5"
          />
        </button>
        
        <el-dropdown
          trigger="click"
          class="ml-2"
        >
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleExport('md')">
                导出 Markdown
              </el-dropdown-item>
              <el-dropdown-item @click="handleExport('pdf')">
                导出 PDF
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
          <button
            class="flex items-center gap-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <Download class="w-4 h-4" />
            <span class="hidden sm:inline">导出</span>
          </button>
        </el-dropdown>
      </div>
    </header>

    <Toolbar @insert="handleInsert" />

    <main class="flex-1 flex overflow-hidden">
      <div class="w-full lg:w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <div class="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-500 dark:text-gray-400">编辑</span>
        </div>
        <Editor
          ref="editorRef"
          v-model="content"
          :is-dark="isDark"
        />
      </div>
      
      <div class="hidden lg:flex w-1/2 flex flex-col">
        <div class="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-500 dark:text-gray-400">预览</span>
        </div>
        <Preview
          :content="content"
          :is-dark="isDark"
        />
      </div>
    </main>

    <div class="lg:hidden p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <Preview
        :content="content"
        :is-dark="isDark"
      />
    </div>
  </div>
</template>

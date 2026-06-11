<script setup lang="ts">
import { computed } from 'vue'
import { parseMarkdown } from '@/utils/mdParser'

const props = defineProps<{
  content: string
  isDark: boolean
}>()

const renderedContent = computed(() => {
  return parseMarkdown(props.content || '# 欢迎使用 Markdown 编辑器\n\n开始编写你的文档吧！')
})
</script>

<template>
  <div
    class="h-full overflow-auto p-6 bg-gray-50 dark:bg-gray-800"
    :class="{ 'dark': isDark }"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div
      class="preview-content text-gray-800 dark:text-gray-100"
      v-html="renderedContent"
    />
  </div>
</template>

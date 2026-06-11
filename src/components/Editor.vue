<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps<{
  modelValue: string
  isDark: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', _value: string): void
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const content = ref(props.modelValue)
const isInitialized = ref(false)

const STORAGE_KEY = 'markdown-editor-content'

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && !props.modelValue) {
    content.value = saved
    emit('update:modelValue', saved)
  }
  isInitialized.value = true
})

watch(content, (newValue) => {
  if (isInitialized.value) {
    emit('update:modelValue', newValue)
    localStorage.setItem(STORAGE_KEY, newValue)
  }
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== content.value) {
    content.value = newValue
  }
})

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  content.value = target.value
}

function focus() {
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

defineExpose({ focus })
</script>

<template>
  <div class="h-full flex flex-col">
    <textarea
      ref="textareaRef"
      :value="content"
      class="editor-textarea flex-1 w-full p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      :class="{ 'dark': isDark }"
      placeholder="开始编写 Markdown..."
      spellcheck="false"
      @input="handleInput"
    />
  </div>
</template>

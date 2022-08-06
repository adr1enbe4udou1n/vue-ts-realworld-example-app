<script lang="ts" setup>
import { marked } from "marked"

const props = defineProps<{
  source: string
}>()

const markdownToHtml = computed(() => marked(props.source))
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div
    prose
    mx-auto
    max-w-full
    dark:text-gray-300
    v-html="markdownToHtml"
  ></div>
</template>

<script lang="ts" setup>
import { getTags } from "@/api"

const { data } = await getTags({})

const tags = data.tags

const selectedTag = ref<string | null>(null)

const emit = defineEmits<{
  (e: "select", tag: string | null): void
}>()

const selectTag = (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? null : tag
  emit("select", selectedTag.value)
}
</script>

<template>
  <ul>
    <li v-for="(t, i) in tags" :key="i" inline-flex>
      <button
        type="button"
        bg-gray
        rounded-full
        text-white
        text-sm
        px-2
        mr-1
        :class="{ 'bg-green': t === selectedTag }"
        @click="selectTag(t)"
      >
        {{ t }}
      </button>
    </li>
  </ul>
</template>

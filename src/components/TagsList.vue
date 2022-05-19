<script lang="ts" setup>
import { getTags } from "~/api"

defineProps<{
  tag: string
}>()

const { data } = await getTags({})

const tags = data.tags

defineEmits(["update:tag"])
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
        :class="{ 'bg-green': t === tag }"
        @click="$emit('update:tag', t)"
      >
        {{ t }}
      </button>
    </li>
  </ul>
</template>

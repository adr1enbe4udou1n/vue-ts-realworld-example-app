<script lang="ts" setup>
import { getTags } from "~/api"

const { data } = await getTags({})

const tags = data.tags

defineEmits(["select"])
</script>

<template>
  <ul>
    <li v-for="(tag, i) in tags" :key="i" inline-flex>
      <button
        bg-gray
        rounded-full
        text-white
        text-sm
        px-2
        mr-1
        @click="$emit('select', tag)"
      >
        {{ tag }}
      </button>
    </li>
  </ul>
</template>

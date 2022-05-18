<script lang="ts" setup>
import { Article } from "~/api"

defineProps<{
  article: Article
}>()

const body = ref("")
</script>

<template>
  <form block rounded border border-gray-300>
    <textarea
      v-model="body"
      w-full
      min-h-40
      rounded-t
      p-4
      block
      focus:outline-none
      placeholder="Leave your comment here"
    />
    <footer
      bg-gray-100
      flex
      p-4
      rounded-b
      border-t
      border-gray-300
      items-center
    >
      <img
        rounded-full
        w-10
        h-10
        src="https://randomuser.me/api/portraits/men/52.jpg"
        alt="John Doe"
      />
      <button ml-auto type="submit" class="btn btn-primary btn-sm">
        Post Comment
      </button>
    </footer>
  </form>
</template>

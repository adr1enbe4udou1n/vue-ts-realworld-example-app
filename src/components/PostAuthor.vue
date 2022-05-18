<script lang="ts" setup>
import { Article } from "~/api"

const props = defineProps<{
  article: Article
}>()
</script>

<template>
  <div flex items-center>
    <ProfileCard :author="article.author" :date="article.createdAt" mr-4 />
    <div mr-2>
      <button
        type="button"
        rounded
        bg-gray-300
        py-1
        px-2
        text-sm
        flex
        items-center
        text-black
      >
        <i i-carbon-add class="-ml-1" mr-1></i>
        Follow {{ article.author.username }}
      </button>
    </div>
    <div>
      <button
        type="button"
        rounded
        bg-gray-300
        py-1
        px-2
        text-sm
        flex
        items-center
        text-black
      >
        <i i-carbon-favorite-filled mr-1></i>
        Favorite Post ({{ article.favoritesCount }})
      </button>
    </div>
  </div>
</template>

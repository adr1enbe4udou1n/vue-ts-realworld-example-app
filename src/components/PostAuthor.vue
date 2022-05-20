<script lang="ts" setup>
import { Article } from "~/api"

defineProps<{
  article: Article
}>()

defineEmits<{
  (e: "follow", toggle: boolean): void
  (e: "favorite", toggle: boolean): void
}>()
</script>

<template>
  <div flex items-center>
    <ProfileCard :author="article.author" :date="article.createdAt" mr-4 />
    <div mr-2>
      <FollowProfile
        :profile="article.author"
        @follow="$emit('follow', $event)"
      />
    </div>
    <div>
      <FavoriteArticle
        :article="article"
        :full="true"
        @favorite="$emit('favorite', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Article } from "@/api"

defineProps<{
  article: Article
}>()

defineEmits<{
  (e: "follow"): void
  (e: "favorite"): void
}>()
</script>

<template>
  <div flex items-center>
    <ProfileCard :author="article.author" :date="article.createdAt" mr-4 />
    <div mr-2>
      <FollowProfile :profile="article.author" @follow="$emit('follow')" />
    </div>
    <div>
      <FavoriteArticle
        :article="article"
        :full="true"
        @favorite="$emit('favorite')"
      />
    </div>
  </div>
</template>

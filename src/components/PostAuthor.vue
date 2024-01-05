<script lang="ts" setup>
import type { Article } from "@/api"

defineProps<{
  article: Article
}>()
</script>

<template>
  <div flex items-center>
    <ProfileCard :author="article.author" :date="article.createdAt" mr-4 />
    <div mr-2>
      <FollowProfile :profile="article.author" />
    </div>
    <div>
      <FavoriteArticle :article="article" :full="true" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getArticles } from "~/api"

const { data } = await getArticles({})

const articles = data.articles
</script>

<template>
  <PostCard
    v-for="article in articles"
    :key="article.slug!"
    :article="article"
  />
</template>

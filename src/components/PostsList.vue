<script lang="ts" setup>
import { Article, getArticles } from "~/api"

const limit = 10

let articles = ref<Article[]>([])

const { data } = await getArticles({ limit })

articles.value = data.articles
const total = data.articlesCount

const fetchData = async ({
  currentPage,
  currentPageSize,
}: {
  currentPage: number
  currentPageSize: number
}) => {
  const { data } = await getArticles({
    limit,
    offset: Math.floor(currentPageSize * (currentPage - 1)),
  })

  articles.value = data.articles
}
</script>

<template>
  <PostCard
    v-for="article in articles"
    :key="article.slug"
    :article="article"
  />

  <OffsetPagination :limit="limit" :total="total" :fetch-data="fetchData" />
</template>

<script lang="ts" setup>
import { Article, getArticles } from "~/api"
import { pagination } from "~/helpers/pagination-range"

const limit = 10

let articles = ref<Article[]>([])

const { data } = await getArticles({ limit })

articles.value = data.articles!

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

  articles.value = data.articles!
}

const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total: data.articlesCount,
    page: 1,
    pageSize: limit,
    onPageChange: fetchData,
    onPageSizeChange: fetchData,
  })
</script>

<template>
  <PostCard
    v-for="article in articles"
    :key="article.slug!"
    :article="article"
  />

  <div mt-4 flex flex-wrap gap-1>
    <button :disabled="isFirstPage" class="btn" @click="prev">&lt;</button>
    <button
      v-for="item in pagination(currentPage, pageCount)"
      :key="item"
      :disabled="currentPage === item || !Number.isInteger(item)"
      class="btn"
      :class="{ active: currentPage === item }"
      @click="currentPage = (item as number)"
    >
      {{ item }}
    </button>
    <button :disabled="isLastPage" class="btn" @click="next">&gt;</button>
  </div>
</template>

<style scoped>
.btn {
  @apply flex items-center justify-center border rounded-1 text-sm font-sans text-gray-500 border-gray-500 w-8 h-8;
}

.btn:disabled:not(.active) {
  @apply opacity-50;
}

.btn.active {
  @apply text-white border-green bg-green;
}
</style>

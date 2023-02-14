<script lang="ts" setup>
import { type Article, getArticles, getArticlesFeed } from "@/api"

const props = withDefaults(
  defineProps<{
    author?: string | null
    favorited?: string | null
    tag?: string | null
    useFeed?: boolean
  }>(),
  {
    author: null,
    favorited: null,
    tag: null,
    useFeed: false,
  }
)

const limit = 10

const articles = ref<Article[]>([])
const page = ref(0)
const total = ref(0)

const fetchData = async ({
  currentPage,
  currentPageSize,
}: {
  currentPage: number
  currentPageSize: number
}) => {
  const { data } = props.useFeed
    ? await getArticlesFeed({
        limit,
        offset: Math.floor(currentPageSize * (currentPage - 1)),
      })
    : await getArticles({
        limit,
        offset: Math.floor(currentPageSize * (currentPage - 1)),
        tag: props.tag || undefined,
        author: props.author || undefined,
        favorited: props.favorited || undefined,
      })

  articles.value = data.articles
  total.value = data.articlesCount
  page.value = currentPage
}

watch(
  () => props.tag,
  async () => {
    await fetchData({ currentPage: 1, currentPageSize: 10 })
  }
)

await fetchData({ currentPage: 1, currentPageSize: 10 })
</script>

<template>
  <PostCard
    v-for="(article, i) in articles"
    :key="i"
    :article="article"
    :tag="tag"
    @favorite="article.favorited = $event"
  />

  <OffsetPagination
    v-if="total > limit"
    :page="page"
    :limit="limit"
    :total="total"
    :fetch-data="fetchData"
  />
</template>

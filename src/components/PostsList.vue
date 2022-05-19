<script lang="ts" setup>
import { Article, getArticles } from "~/api"

const props = withDefaults(
  defineProps<{
    author?: string
    favorited?: string
    tag?: string
    hideTags?: boolean
  }>(),
  {
    author: undefined,
    favorited: undefined,
    hideTags: false,
    tag: undefined,
  }
)

const limit = 10

let articles = ref<Article[]>([])
let page = ref(0)
let total = ref(0)

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
    tag: props.tag,
    author: props.author,
    favorited: props.favorited,
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

defineEmits(["update:tag"])
</script>

<template>
  <PostCard
    v-for="(article, i) in articles"
    :key="i"
    :article="article"
    :tag="tag"
    :hide-tags="hideTags"
    @select-tag="(t) => $emit('update:tag', t)"
  />

  <OffsetPagination
    :page="page"
    :limit="limit"
    :total="total"
    :fetch-data="fetchData"
  />
</template>

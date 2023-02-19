<script lang="ts" setup>
import { getArticles, getArticlesFeed, favoriteArticleToggle } from "@/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"

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

const queryClient = useQueryClient()

const limit = 10
const page = ref(1)
const offset = computed(() => Math.floor(limit * (page.value - 1)))

const fetchData = () => {
  return props.useFeed
    ? getArticlesFeed({
        limit,
        offset: offset.value,
      })
    : getArticles({
        limit,
        offset: offset.value,
        tag: props.tag || undefined,
        author: props.author || undefined,
        favorited: props.favorited || undefined,
      })
}

const articlesQuery = useQuery({
  queryFn: () => fetchData().then(({ data }) => data),
  queryKey: ["articles", props.tag, props.author, props.favorited, page],
})

const mutation = useMutation({
  mutationFn: favoriteArticleToggle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["articles"] })
  },
})

const articles = computed(() => articlesQuery.data.value?.articles || [])
const total = computed(() => articlesQuery.data.value?.articlesCount || 0)

watch(
  () => props.tag,
  () => {
    page.value = 1
    articlesQuery.refetch()
  }
)
</script>

<template>
  <PostCard
    v-for="(article, i) in articles"
    :key="i"
    :article="article"
    :tag="tag"
    @favorite="() => mutation.mutate(article)"
  />

  <OffsetPagination
    v-if="total > limit"
    :page="page"
    :limit="limit"
    :total="total"
    :fetch-data="
      ({ currentPage }) => {
        page = currentPage
        articlesQuery.refetch()
      }
    "
  />
</template>

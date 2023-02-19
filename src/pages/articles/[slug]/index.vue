<script lang="ts" setup>
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Comment,
  deleteArticle,
  getArticle,
  getComments,
  favoriteArticleToggle,
  followProfileToggle,
} from "@/api"
import { useUserStore } from "@/stores/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"

const userStore = useUserStore()
const router = useRouter()
const queryClient = useQueryClient()

const props = defineProps<{ slug: string }>()

const articlesQuery = useQuery({
  queryFn: () =>
    getArticle({ slug: props.slug }).then(({ data }) => data.article),
  queryKey: ["articles", props.slug],
  onSuccess: (data) => {
    useHead({
      title: `${data.title} - Conduit`,
      meta: [{ name: "description", content: data.description }],
    })
  },
})

const commentsQuery = useQuery({
  queryFn: () =>
    getComments({ slug: props.slug }).then(({ data }) => data.comments),
  queryKey: ["comments", props.slug],
})

const mutationFollow = useMutation({
  mutationFn: followProfileToggle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["articles", props.slug] })
  },
})

const mutationFavorite = useMutation({
  mutationFn: favoriteArticleToggle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["articles", props.slug] })
  },
})

const deleteArticleAction = async () => {
  if (confirm("Are you sure?")) {
    await deleteArticle({ slug: props.slug })

    router.push("/")
  }
}

const article = computed(() => articlesQuery.data.value)
const comments = computed(() => commentsQuery.data.value || [])
</script>

<template>
  <template v-if="article">
    <div bg-gray-800 text-white py-8 mb-8>
      <div class="container">
        <h1 font-brand font-bold text-5xl mb-8>{{ article.title }}</h1>

        <div flex items-center>
          <PostAuthor
            :article="article"
            @follow="() => mutationFollow.mutate(article!.author)"
            @favorite="() => mutationFavorite.mutate(article!)"
          />

          <div
            v-if="
              userStore.isLoggedIn &&
              article.author.username === userStore.user?.username
            "
            ml-auto
            flex
            gap-2
          >
            <BaseButton
              size="sm"
              variant="secondary"
              :to="`/articles/${slug}/edit`"
            >
              <i class="i-carbon-edit"></i>
              Edit
            </BaseButton>
            <BaseButton
              type="button"
              size="sm"
              variant="secondary"
              @click="deleteArticleAction"
            >
              <i class="i-carbon-trash-can"></i>
              Delete
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <div class="container" flex flex-col md:flex-row mb-8 gap-8>
      <MarkdownViewer :source="article.body" />
    </div>
    <div class="container" border-t border-gray-300 py-4 flex flex-col>
      <PostAuthor
        :article="article"
        mx-auto
        mb-8
        @follow="() => followProfileToggle(article!.author)"
        @favorite="() => favoriteArticleToggle(article!)"
      />
      <div mx-auto max-w-2xl flex flex-col gap-4 lg:min-w-xl>
        <CommentNew :article="article" />
        <CommentCard
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :slug="article.slug"
        />
      </div>
    </div>
  </template>
</template>

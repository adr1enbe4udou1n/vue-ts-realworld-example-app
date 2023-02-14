<script lang="ts" setup>
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type Comment,
  deleteArticle,
  getArticle,
  getComments,
} from "@/api"
import BaseButton from "@/components/BaseButton.vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
const router = useRouter()

const props = defineProps<{ slug: string }>()

const articleResponse = await getArticle({ slug: props.slug })
const article = ref(articleResponse.data.article)

const commentsResponse = await getComments({ slug: props.slug })
const comments = ref(commentsResponse.data.comments)

const deleteArticleAction = async () => {
  if (confirm("Are you sure?")) {
    await deleteArticle({ slug: props.slug })

    router.push("/")
  }
}

useHead({
  title: `${article.value.title} - Conduit`,
  meta: [{ name: "description", content: article.value.description }],
})
</script>

<template>
  <div bg-gray-800 text-white py-8 mb-8>
    <div class="container">
      <h1 font-brand font-bold text-5xl mb-8>{{ article.title }}</h1>

      <div flex items-center>
        <PostAuthor
          :article="article"
          @follow="article.author.following = $event"
          @favorite="article.favorited = $event"
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
            size="sm"
            variant="secondary"
            label="Delete"
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
      @follow="article.author.following = $event"
      @favorite="article.favorited = $event"
    />
    <div mx-auto max-w-2xl flex flex-col gap-4 lg:min-w-xl>
      <CommentNew
        :article="article"
        @comment-created="(c: Comment) => (comments = [c, ...comments])"
      />
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :slug="article.slug"
        @comment-deleted="
          () => (comments = comments.filter((c) => c.id !== comment.id))
        "
      />
    </div>
  </div>
</template>

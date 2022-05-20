<script lang="ts" setup>
import { deleteArticle, getArticle, getComments } from "~/api"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()
const router = useRouter()

const props = defineProps<{ slug: string }>()

const articleResponse = await getArticle({ slug: props.slug })
const article = articleResponse.data.article

const commentsResponse = await getComments({ slug: props.slug })
const comments = ref(commentsResponse.data.comments)

const deleteArticleAction = async () => {
  if (confirm("Are you sure?")) {
    await deleteArticle({ slug: props.slug })

    router.push("/")
  }
}
</script>

<template>
  <div bg-gray-800 text-white py-8 mb-8>
    <div class="container">
      <h1 font-brand font-bold text-5xl mb-8>{{ article.title }}</h1>

      <div flex items-center>
        <PostAuthor :article="article" />

        <div
          v-if="
            userStore.isLoggedIn &&
            article.author.username === userStore.user?.username
          "
          ml-auto
          flex
          gap-2
        >
          <IconButton
            icon="i-carbon-edit"
            label="Edit"
            :link="`/articles/${slug}/edit`"
          />
          <IconButton
            icon="i-carbon-trash-can"
            label="Delete"
            @click="deleteArticleAction"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="container" flex flex-col md:flex-row mb-8 gap-8>
    <MarkdownViewer :source="article.body" />
  </div>
  <div class="container" border-t border-gray-300 py-4 flex flex-col>
    <PostAuthor :article="article" mx-auto mb-8 />
    <div mx-auto w-2xl flex flex-col gap-4>
      <CommentNew
        :article="article"
        @comment-created="(c) => (comments = [c, ...comments])"
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

<script lang="ts" setup>
import { getArticle, getComments } from "~/api"

const props = defineProps<{ slug: string }>()

const articleResponse = await getArticle({ slug: props.slug })
const commentsResponse = await getComments({ slug: props.slug })

const article = articleResponse.data.article
const comments = commentsResponse.data.comments
</script>

<template>
  <div bg-gray-800 text-white py-8 mb-8>
    <div class="container">
      <h1 font-brand font-bold text-5xl mb-8>{{ article.title }}</h1>

      <PostAuthor :article="article" />
    </div>
  </div>
  <div class="container" flex flex-col md:flex-row mb-8 gap-8>
    <MarkdownViewer :source="article.body" />
  </div>
  <div class="container" border-t border-gray-300 py-4 flex flex-col>
    <PostAuthor :article="article" mx-auto mb-8 />
    <div mx-auto w-2xl flex flex-col gap-4>
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
      <CommentNew :article="article" />
    </div>
  </div>
</template>

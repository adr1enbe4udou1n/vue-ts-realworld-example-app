<script lang="ts" setup>
import { type Comment, deleteComment } from "@/api"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const props = defineProps<{
  slug: string
  comment: Comment
}>()

const emit = defineEmits(["comment-deleted"])

const deleteCommentAction = async () => {
  if (confirm("Are you sure?")) {
    await deleteComment({
      slug: props.slug,
      commentId: props.comment.id,
    })

    emit("comment-deleted")
  }
}
</script>

<template>
  <div rounded border border-gray-300 dark:border-gray-800>
    <div px-4>
      <MarkdownViewer :source="comment.body" />
    </div>
    <footer
      bg-gray-100
      flex
      p-4
      rounded-b
      border-t
      border-gray-300
      dark:bg-gray-800
      dark:border-gray-800
    >
      <ProfileCard
        :author="comment.author"
        :date="comment.createdAt"
        :inline="true"
        mr-4
      />
      <div
        v-if="
          userStore.isLoggedIn &&
          comment.author.username === userStore.user?.username
        "
        flex
        gap-2
        ml-auto
      >
        <button
          type="button"
          inline-flex
          dark:text-white
          @click="deleteCommentAction"
        >
          <i i-carbon-trash-can></i>
        </button>
      </div>
    </footer>
  </div>
</template>

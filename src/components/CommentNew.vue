<script lang="ts" setup>
import {
  type Article,
  type Comment,
  createComment,
  handleValidation,
} from "@/api"
import { useUserStore } from "@/stores/user"
import FormValidation from "./FormValidation.vue"

const userStore = useUserStore()

const props = defineProps<{
  article: Article
}>()

const emit = defineEmits<{
  (e: "comment-created", comment: Comment): void
}>()

const body = ref("")

const onSuccess = async ({ comment }: { comment: Comment }) => {
  emit("comment-created", comment)
}
</script>

<template>
  <FormValidation
    v-if="userStore.user"
    block
    rounded
    border
    border-gray-300
    :action="
      () =>
        handleValidation(
          createComment,
          {
            slug: props.article.slug,
            comment: {
              body: body,
            },
          },
          onSuccess
        )
    "
  >
    <textarea
      v-model="body"
      w-full
      min-h-40
      rounded-t
      p-4
      block
      focus:outline-none
      placeholder="Leave your comment here (in markdown)"
    />
    <footer
      bg-gray-100
      flex
      p-4
      rounded-b
      border-t
      border-gray-300
      items-center
    >
      <img
        v-if="userStore.user.image"
        rounded-full
        w-10
        h-10
        :src="userStore.user.image"
        :alt="userStore.user.username"
      />
      <button ml-auto type="submit" class="btn btn-primary btn-sm">
        Post Comment
      </button>
    </footer>
  </FormValidation>
</template>

<script lang="ts" setup>
import { type Article, createComment, type HandleValidation } from "@/api"
import { useUserStore } from "@/stores/user"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

const queryClient = useQueryClient()
const userStore = useUserStore()

const props = defineProps<{
  article: Article
}>()

const body = ref("")

const mutation = useMutation({
  mutationFn: (handleValidation: HandleValidation) =>
    createComment(
      props.article.slug,
      {
        body: body.value,
      },
      handleValidation,
    ),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["comments", props.article.slug],
    })
    body.value = ""
  },
})
</script>

<template>
  <FormValidation
    v-if="userStore.user"
    block
    rounded
    border
    border-gray-300
    :action="mutation.mutateAsync"
  >
    <textarea
      v-model="body"
      dark:bg-gray-800
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
      dark:bg-gray-300
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
      <BaseButton ml-auto size="sm">Post Comment</BaseButton>
    </footer>
  </FormValidation>
</template>

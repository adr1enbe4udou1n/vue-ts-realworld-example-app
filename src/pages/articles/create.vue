<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { createArticle, type HandleValidation } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

const queryClient = useQueryClient()
const router = useRouter()

const form = ref({
  title: "",
  description: "",
  body: "",
  tagList: [],
})

const mutation = useMutation({
  mutationFn: async (handleValidation: HandleValidation) => {
    const article = await createArticle(form.value, handleValidation)

    if (article) {
      router.push(`/articles/${article.slug}`)
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["articles"] })
  },
})
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2 dark:text-white>Your new post</h1>
      </div>
      <FormValidation flex flex-col gap-4 :action="mutation.mutateAsync">
        <div>
          <input
            v-model="form.title"
            type="text"
            placeholder="Post Title"
            class="form-control"
            required
          />
        </div>
        <div>
          <textarea
            v-model="form.description"
            placeholder="Short description"
            class="form-control"
            required
          />
        </div>
        <div>
          <textarea
            v-model="form.body"
            placeholder="Write your post (in markdown)"
            class="form-control"
            required
            h-100
          />
        </div>
        <div>
          <TagInput v-model="form.tagList" />
        </div>

        <div flex justify-end>
          <BaseButton>Create Post</BaseButton>
        </div>
      </FormValidation>
    </div>
  </div>
</template>

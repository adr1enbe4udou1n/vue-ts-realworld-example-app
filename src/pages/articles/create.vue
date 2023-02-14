<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { createArticle, handleValidation, type Article } from "@/api"

const router = useRouter()

const form = ref({
  title: "",
  description: "",
  body: "",
  tagList: [],
})

const onSuccess = async ({ article }: { article: Article }) => {
  router.push(`/articles/${article.slug}`)
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2 dark:text-white>Your new post</h1>
      </div>
      <FormValidation
        flex
        flex-col
        gap-4
        :action="
          () =>
            handleValidation(
              createArticle,
              {
                article: form,
              },
              onSuccess
            )
        "
      >
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

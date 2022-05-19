<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { createArticle, handleValidation } from "~/api"

const router = useRouter()

const form = ref({
  title: "",
  description: "",
  body: "",
  tagList: [],
})

const submit = async () => {
  const response = await handleValidation(createArticle, {
    article: form.value,
  })

  if (response) {
    router.push(`/articles/${response.data.article.slug}`)
  }
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2>Your new post</h1>
      </div>
      <form flex flex-col gap-4 @submit.prevent="submit">
        <AlertMessage />
        <div>
          <input
            v-model="form.title"
            type="text"
            placeholder="Post Title"
            class="form-control"
          />
        </div>
        <div>
          <textarea
            v-model="form.description"
            placeholder="Short description"
            class="form-control"
          />
        </div>
        <div>
          <textarea
            v-model="form.body"
            placeholder="Write your post (in markdown)"
            class="form-control"
            h-100
          />
        </div>
        <div>
          <TagInput v-model="form.tagList" />
        </div>

        <div flex justify-end>
          <button class="btn btn-primary" type="submit">Create Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

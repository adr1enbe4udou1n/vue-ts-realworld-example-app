<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { updateArticle, handleValidation, getArticle } from "~/api"

const props = defineProps<{ slug: string }>()

const articleResponse = await getArticle({ slug: props.slug })
const article = articleResponse.data.article

const router = useRouter()

const form = ref({
  title: article.title,
  description: article.description,
  body: article.body,
})

const submit = async () => {
  const response = await handleValidation(updateArticle, {
    slug: props.slug,
    article: form.value,
  })

  if (response) {
    router.push(`/articles/${response.data.article.slug}`)
  }
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2 dark:text-white>
          Edit the post "{{ article.slug }}"
        </h1>
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

        <div flex justify-end>
          <button class="btn btn-primary" type="submit">Edit Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

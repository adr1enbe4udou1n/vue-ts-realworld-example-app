<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { updateArticle, getArticle, type Article } from "@/api"
import FormValidation from "@/components/FormValidation.vue"

const props = defineProps<{ slug: string }>()

const articleResponse = await getArticle({ slug: props.slug })
const article = articleResponse.data.article

const router = useRouter()

const form = ref({
  title: article.title,
  description: article.description,
  body: article.body,
})

const success = async (article: Article) => {
  router.push(`/articles/${article.slug}`)
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
      <FormValidation
        flex
        flex-col
        gap-4
        :operation="updateArticle"
        :arg="{
          slug: props.slug,
          article: form,
        }"
        @success="success"
      >
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
      </FormValidation>
    </div>
  </div>
</template>

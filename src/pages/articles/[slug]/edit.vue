<route lang="yaml">
props: true
meta:
  auth: true
</route>

<script setup lang="ts">
import { updateArticle, getArticle, handleValidation } from "~/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"

const queryClient = useQueryClient()
const router = useRouter()
const props = defineProps<{
  slug: string
}>()

const form = ref({
  title: "",
  description: "",
  body: "",
})

const { data } = useQuery({
  queryFn: () =>
    getArticle({ slug: props.slug }).then(({ data }) => {
      form.value.title = data.article.title
      form.value.description = data.article.description
      form.value.body = data.article.body

      return data.article
    }),
  queryKey: ["articles"],
})

const mutation = useMutation({
  mutationFn: () =>
    handleValidation(updateArticle, {
      slug: props.slug,
      article: form.value,
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["articles", props.slug] })
    router.push(`/articles/${props.slug}`)
  },
})
</script>

<template>
  <div class="container" flex flex-col mb-8 v-if="data">
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2 dark:text-white>
          Edit the post "{{ data.title }}"
        </h1>
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

        <div flex justify-end>
          <BaseButton>Edit Post</BaseButton>
        </div>
      </FormValidation>
    </div>
  </div>
</template>

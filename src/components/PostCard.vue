<script lang="ts" setup>
import { Article } from "~/api"

defineProps<{
  article: Article
}>()

defineEmits(["select-tag"])

const getDate = (date: string) => {
  const month = new Date(date).toLocaleString("en", { month: "long" })
  return `${month} ${useDateFormat(date, "DD, YYYY").value}`
}
</script>

<template>
  <div border-t border-gray-200 py-4>
    <div>
      <header flex mb-2>
        <router-link
          :to="`/author/${article.author!.username!}`"
          flex
          items-center
        >
          <img
            rounded-full
            w-10
            h-10
            mr-2
            :src="article.author!.image!"
            :alt="article.author!.username!"
          />
          <div>
            <h2 font-sans text-green class="-mb-1">
              {{ article.author!.username }}
            </h2>
            <time text-xs>{{ getDate(article.createdAt) }}</time>
          </div>
        </router-link>
        <div ml-auto>
          <button
            border
            border-green
            flex
            items-center
            text-green
            rounded-1
            px-2
            text-sm
            font-sans
          >
            <i i-carbon-favorite-filled text-xs mr-1></i>
            {{ article.favoritesCount }}
          </button>
        </div>
      </header>
      <div flex flex-col gap-2 relative>
        <h3 font-heading font-bold text-xl>{{ article.title }}</h3>
        <p text-sm text-gray-500>
          {{ article.description }}
        </p>
        <footer flex items-center>
          <span text-xs text-gray-300> Read more... </span>
          <div ml-auto z-10>
            <button
              v-for="(tag, i) in article.tagList"
              :key="i"
              border
              border-gray-300
              text-gray-300
              rounded-full
              px-2
              ml-1
              text-xs
              @click="$emit('select-tag', tag)"
            >
              {{ tag }}
            </button>
          </div>
        </footer>
        <router-link :to="`/article/${article.slug!}`" absolute inset-0>
        </router-link>
      </div>
    </div>
  </div>
</template>

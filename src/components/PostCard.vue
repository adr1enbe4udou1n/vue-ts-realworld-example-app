<script lang="ts" setup>
import type { Article } from "@/api"

withDefaults(
  defineProps<{
    article: Article
    tag?: string | null
  }>(),
  {
    tag: null,
  }
)

defineEmits<{
  (e: "favorite", toggle: boolean): void
}>()
</script>

<template>
  <div border-t border-gray-200 py-4>
    <div>
      <header flex mb-2>
        <ProfileCard :author="article.author" :date="article.createdAt" />
        <div ml-auto>
          <FavoriteArticle
            :article="article"
            :full="false"
            @favorite="$emit('favorite', $event)"
          />
        </div>
      </header>
      <div flex flex-col gap-2 relative>
        <h3 font-heading font-bold text-xl dark:text-white>
          {{ article.title }}
        </h3>
        <p text-sm text-gray-300>
          {{ article.description }}
        </p>
        <footer flex items-center>
          <span text-xs text-gray-300> Read more... </span>
          <div ml-auto>
            <span
              v-for="(t, i) in article.tagList"
              :key="i"
              border
              border-gray-300
              text-gray-300
              rounded-full
              px-2
              ml-1
              text-xs
              :class="{ 'border-green text-green': t === tag }"
            >
              {{ t }}
            </span>
          </div>
        </footer>
        <router-link :to="`/articles/${article.slug}`" absolute inset-0>
        </router-link>
      </div>
    </div>
  </div>
</template>

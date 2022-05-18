<script lang="ts" setup>
import { Article } from "~/api"

const props = withDefaults(
  defineProps<{
    article: Article
    tag?: string
    hideTags: boolean
  }>(),
  {
    tag: undefined,
    hideTags: false,
  }
)

defineEmits(["select-tag"])
</script>

<template>
  <div border-t border-gray-200 py-4>
    <div>
      <header flex mb-2>
        <ProfileCard :author="article.author" :date="article.createdAt" />
        <div ml-auto>
          <FavoriteArticle :article="article" />
        </div>
      </header>
      <div flex flex-col gap-2 relative>
        <h3 font-heading font-bold text-xl>{{ article.title }}</h3>
        <p text-sm text-gray-500>
          {{ article.description }}
        </p>
        <footer flex items-center>
          <span text-xs text-gray-300> Read more... </span>
          <div v-if="!hideTags" ml-auto z-10>
            <button
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
              @click="$emit('select-tag', t)"
            >
              {{ t }}
            </button>
          </div>
        </footer>
        <router-link :to="`/articles/${article.slug}`" absolute inset-0>
        </router-link>
      </div>
    </div>
  </div>
</template>

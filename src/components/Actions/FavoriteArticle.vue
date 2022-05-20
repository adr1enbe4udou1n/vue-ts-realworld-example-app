<script lang="ts" setup>
import { Article, favoriteArticle, unfavoriteArticle } from "~/api"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

const props = withDefaults(
  defineProps<{
    article: Article
    full?: boolean
  }>(),
  {
    full: false,
  }
)

const toggle = ref(props.article.favorited)
const counter = ref(props.article.favoritesCount)

const icon = computed(() => {
  return toggle.value ? "i-carbon-favorite-filled" : "i-carbon-favorite"
})

const label = computed(() => {
  return toggle.value ? "Unfavorite" : "Favorite"
})

const toggleFavorite = async () => {
  userStore.ensureLoggedIn()

  if (toggle.value) {
    await unfavoriteArticle({ slug: props.article.slug })
    toggle.value = false
    counter.value -= 1
    return
  }

  await favoriteArticle({ slug: props.article.slug })
  toggle.value = true
  counter.value += 1
}
</script>

<template>
  <IconButton
    v-if="full"
    :icon="icon"
    :label="`${label} Post (${counter})`"
    @click="toggleFavorite"
  />
  <button
    v-else
    type="button"
    border
    border-green
    flex
    items-center
    text-green
    rounded-1
    px-2
    text-sm
    @click="toggleFavorite"
  >
    <i :class="icon" text-xs mr-1></i>
    {{ counter }}
  </button>
</template>

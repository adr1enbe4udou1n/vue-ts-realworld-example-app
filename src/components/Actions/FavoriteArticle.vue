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

const counter = ref(props.article.favoritesCount)

watch(
  () => props.article.favorited,
  async (newValue) => {
    if (newValue) {
      counter.value++
      return
    }
    counter.value--
  }
)

const emit = defineEmits<{
  (e: "favorite", toggle: boolean): void
}>()

const icon = computed(() => {
  return props.article.favorited
    ? "i-carbon-favorite-filled"
    : "i-carbon-favorite"
})

const label = computed(() => {
  return props.article.favorited ? "Unfavorite" : "Favorite"
})

const toggleFavorite = async () => {
  userStore.ensureLoggedIn()

  if (props.article.favorited) {
    await unfavoriteArticle({ slug: props.article.slug })
    emit("favorite", false)
    return
  }

  await favoriteArticle({ slug: props.article.slug })
  emit("favorite", true)
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

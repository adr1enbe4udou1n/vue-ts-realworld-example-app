<script lang="ts" setup>
import { favoriteArticle, unfavoriteArticle, type Article } from "@/api"
import { useUserStore } from "@/stores/user"

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
    counter.value--
    emit("favorite", false)
    return
  }

  await favoriteArticle({ slug: props.article.slug })
  counter.value++
  emit("favorite", true)
}
</script>

<template>
  <BaseButton
    type="button"
    size="sm"
    variant="secondary"
    v-if="full"
    @click="toggleFavorite"
  >
    <i :class="icon"></i>
    {{ `${label} Post (${counter})` }}
  </BaseButton>
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

<script lang="ts" setup>
import type { Article } from "@/api"
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

const emit = defineEmits<{
  (e: "favorite"): void
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

  emit("favorite")
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
    {{ `${label} Post (${props.article.favoritesCount})` }}
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
    {{ props.article.favoritesCount }}
  </button>
</template>

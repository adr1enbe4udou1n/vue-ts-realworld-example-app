<script lang="ts" setup>
import { favoriteArticleToggle, type Article } from "@/api"
import { useUserStore } from "@/stores/user"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

const queryClient = useQueryClient()
const userStore = useUserStore()

const props = withDefaults(
  defineProps<{
    article: Article
    full?: boolean
  }>(),
  {
    full: false,
  },
)

const mutation = useMutation({
  mutationFn: favoriteArticleToggle,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["articles"],
    })
  },
})

const icon = computed(() => {
  return props.article.favorited
    ? "i-carbon-favorite-filled"
    : "i-carbon-favorite"
})

const label = computed(() => {
  return props.article.favorited ? "Unfavorite" : "Favorite"
})

const toggleFavorite = () => {
  userStore.ensureLoggedIn()

  mutation.mutate(props.article)
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

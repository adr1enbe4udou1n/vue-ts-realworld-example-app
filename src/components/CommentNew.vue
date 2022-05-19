<script lang="ts" setup>
import { Article } from "~/api"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

defineProps<{
  article: Article
}>()

const body = ref("")
</script>

<template>
  <form v-if="userStore.user" block rounded border border-gray-300>
    <textarea
      v-model="body"
      w-full
      min-h-40
      rounded-t
      p-4
      block
      focus:outline-none
      placeholder="Leave your comment here"
    />
    <footer
      bg-gray-100
      flex
      p-4
      rounded-b
      border-t
      border-gray-300
      items-center
    >
      <img
        v-if="userStore.user.image"
        rounded-full
        w-10
        h-10
        :src="userStore.user.image"
        :alt="userStore.user.username"
      />
      <button ml-auto type="submit" class="btn btn-primary btn-sm">
        Post Comment
      </button>
    </footer>
  </form>
</template>

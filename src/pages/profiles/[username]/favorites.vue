<script lang="ts" setup>
defineProps<{ username: string }>()
</script>

<template>
  <AuthorLayout :author="username">
    <PostsList :favorited="username" :hide-tags="true" />
  </AuthorLayout>
</template>

<script lang="ts" setup>
defineProps<{ username: string }>()
</script>

<template>
  <AuthorLayout :author="username">
    <PostsList :favorited="username" />
  </AuthorLayout>
</template>

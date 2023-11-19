<route lang="yaml">
props: true
</route>

<script lang="ts" setup>
defineProps<{
  username: string
}>()
</script>

<template>
  <AuthorLayout :author="username">
    <PostsList :author="username" />
  </AuthorLayout>
</template>

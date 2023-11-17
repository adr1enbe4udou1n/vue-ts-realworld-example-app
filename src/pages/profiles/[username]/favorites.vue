<script lang="ts" setup>
const route = useRoute("/profiles/[username]/favorites")
</script>

<template>
  <AuthorLayout :author="route.params.username">
    <PostsList :favorited="route.params.username" />
  </AuthorLayout>
</template>

<script lang="ts" setup>
const route = useRoute("/profiles/[username]/")
</script>

<template>
  <AuthorLayout :author="route.params.username">
    <PostsList :author="route.params.username" />
  </AuthorLayout>
</template>

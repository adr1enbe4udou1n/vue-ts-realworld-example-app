<script lang="ts" setup>
import { Comment } from "~/api"

const props = defineProps<{
  comment: Comment
}>()
</script>

<template>
  <div rounded border border-gray-300>
    <div px-4>
      <MarkdownViewer :source="comment.body" />
    </div>
    <footer bg-gray-100 flex>
      <ProfileCard
        :author="comment.author"
        :date="comment.createdAt"
        :inline="true"
        mr-4
      />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { Comment } from "~/api"

defineProps<{
  comment: Comment
}>()
</script>

<template>
  <div rounded border border-gray-300>
    <div px-4>
      <MarkdownViewer :source="comment.body" />
    </div>
    <footer bg-gray-100 flex p-4 rounded-b border-t border-gray-300>
      <ProfileCard
        :author="comment.author"
        :date="comment.createdAt"
        :inline="true"
        mr-4
      />
      <div flex gap-2 ml-auto>
        <button type="button" flex-inline>
          <i i-carbon-edit></i>
        </button>
        <button type="button" flex-inline>
          <i i-carbon-trash-can></i>
        </button>
      </div>
    </footer>
  </div>
</template>

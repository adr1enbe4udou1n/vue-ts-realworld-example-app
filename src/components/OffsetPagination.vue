<script lang="ts" setup>
import { pagination } from "~/helpers/pagination-range"

const props = defineProps<{
  total: number
  limit: number
  fetchData: ({
    currentPage,
    currentPageSize,
  }: {
    currentPage: number
    currentPageSize: number
  }) => Promise<void>
}>()

const { currentPage, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total: props.total,
    page: 1,
    pageSize: props.limit,
    onPageChange: props.fetchData,
    onPageSizeChange: props.fetchData,
  })
</script>

<template>
  <div flex flex-wrap gap-1>
    <button :disabled="isFirstPage" class="btn" @click="prev">&lt;</button>
    <button
      v-for="item in pagination(currentPage, pageCount)"
      :key="item"
      :disabled="currentPage === item || !Number.isInteger(item)"
      class="btn"
      :class="{ active: currentPage === item }"
      @click="currentPage = (item as number)"
    >
      {{ item }}
    </button>
    <button :disabled="isLastPage" class="btn" @click="next">&gt;</button>
  </div>
</template>

<style scoped>
.btn {
  @apply flex items-center justify-center border rounded-1 text-sm font-sans text-gray-500 border-gray-500 w-8 h-8;
}

.btn:disabled:not(.active) {
  @apply opacity-50;
}

.btn.active {
  @apply text-white border-green bg-green;
}
</style>

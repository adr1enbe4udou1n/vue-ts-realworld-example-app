<script lang="ts" setup>
import { usePagesBuilder } from "~/helpers/pagination-range"

const props = defineProps<{
  total: number
  limit: number
  page: number
  fetchData: ({
    currentPage,
    currentPageSize,
  }: {
    currentPage: number
    currentPageSize: number
  }) => Promise<void>
}>()

let pagination = computed(() =>
  useOffsetPagination({
    total: props.total,
    page: props.page,
    pageSize: props.limit,
    onPageChange: props.fetchData,
    onPageSizeChange: props.fetchData,
  })
)
</script>

<template>
  <div flex flex-wrap gap-1>
    <button
      :disabled="pagination.isFirstPage.value"
      class="btn"
      @click="pagination.prev"
    >
      &lt;
    </button>
    <button
      v-for="item in usePagesBuilder(
        pagination.currentPage.value,
        pagination.pageCount.value
      )"
      :key="item"
      :disabled="
        pagination.currentPage.value === item || !Number.isInteger(item)
      "
      class="btn"
      :class="{ active: pagination.currentPage.value === item }"
      @click="pagination.currentPage.value = (item as number)"
    >
      {{ item }}
    </button>
    <button
      :disabled="pagination.isLastPage.value"
      class="btn"
      @click="pagination.next"
    >
      &gt;
    </button>
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

<script lang="ts" setup>
import { usePagesBuilder } from "@/helpers/pagination-range"

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

const pagination = computed(() =>
  useOffsetPagination({
    total: props.total,
    page: props.page,
    pageSize: props.limit,
    onPageChange: props.fetchData,
    onPageSizeChange: props.fetchData,
  })
)

const classes =
  "flex items-center justify-center border rounded-1 text-sm font-sans text-gray-300 border-gray-500 w-8 h-8"

const isItemActive = (item: string | number) => {
  return pagination.value.currentPage.value === item
}
</script>

<template>
  <div flex flex-wrap gap-1>
    <button
      :disabled="pagination.isFirstPage.value"
      :class="classes"
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
      :disabled="!Number.isInteger(item)"
      :class="[
        classes,
        {
          'opacity-50': !isItemActive(item) && !Number.isInteger(item),
          'text-white border-green-500 bg-green-500': isItemActive(item),
        },
      ]"
      @click="pagination.currentPage.value = Number(item)"
    >
      {{ item }}
    </button>
    <button
      :disabled="pagination.isLastPage.value"
      :class="classes"
      @click="pagination.next"
    >
      &gt;
    </button>
  </div>
</template>

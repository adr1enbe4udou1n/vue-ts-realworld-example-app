<script lang="ts" setup>
const tag = ref<string | null>(null)
</script>

<template>
  <HomeLayout :tag="tag">
    <template #aside>
      <div w-70>
        <div bg-gray-100 dark:bg-gray-800 font-sans p-2>
          <h3 mb-2 dark:text-white>Popular Tags</h3>
          <Suspense>
            <TagsList @select="(t) => (tag = t)" />
          </Suspense>
        </div>
      </div>
    </template>
  </HomeLayout>
</template>

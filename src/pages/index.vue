<script lang="ts" setup>
const filterByTag = (tag: string) => {
  alert(tag)
}
</script>

<template>
  <div bg-green text-white text-center py-8 mb-8>
    <h1 font-brand font-bold text-5xl mb-4>conduit</h1>
    <p font-sans>A place to share your knowledge.</p>
  </div>
  <div class="container" flex flex-col md:flex-row mb-8 gap-8>
    <div md:flex-1>
      <ArticlesNav />
      <Suspense>
        <PostsList />
      </Suspense>
    </div>

    <div w-70>
      <div bg-gray-100 font-sans p-2>
        <h3 mb-2>Popular Tags</h3>
        <Suspense>
          <TagsList @select="filterByTag" />
        </Suspense>
      </div>
    </div>
  </div>
</template>

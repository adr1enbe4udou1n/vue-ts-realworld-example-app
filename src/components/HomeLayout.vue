<script lang="ts" setup>
withDefaults(
  defineProps<{
    hideTags?: boolean
    useFeed?: boolean
  }>(),
  {
    hideTags: false,
    useFeed: false,
  }
)

const tag = ref("")

const currentTag = computed({
  get: () => tag.value,
  set: (value) => {
    tag.value = tag.value === value ? "" : value
  },
})

const menuItems = [
  {
    name: "Your Feed",
    link: "/feed",
  },
  {
    name: "Global Feed",
    link: "/",
  },
]
</script>

<template>
  <div bg-green text-white text-center py-8 mb-8>
    <h1 font-brand font-bold text-5xl mb-4>conduit</h1>
    <p font-sans>A place to share your knowledge.</p>
  </div>
  <div class="container" flex flex-col md:flex-row mb-8 gap-8>
    <div md:flex-1>
      <ArticlesNav :items="menuItems" />
      <Suspense>
        <PostsList
          v-model:tag="currentTag"
          :hide-tags="hideTags"
          :use-feed="useFeed"
        />
      </Suspense>
    </div>

    <div v-if="!hideTags" w-70>
      <div bg-gray-100 dark:bg-gray-800 font-sans p-2>
        <h3 mb-2 dark:text-white>Popular Tags</h3>
        <Suspense>
          <TagsList v-model:tag="currentTag" />
        </Suspense>
      </div>
    </div>
  </div>
</template>

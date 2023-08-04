<script lang="ts" setup>
withDefaults(
  defineProps<{
    tag?: string | null
    useFeed?: boolean
  }>(),
  {
    tag: null,
    useFeed: false,
  },
)

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
      <PostsList :tag="tag" :use-feed="useFeed" />
    </div>

    <slot name="aside" />
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    name: "You Feed",
    link: "/feed",
  },
  {
    name: "Global Feed",
    link: "/",
  },
]
</script>

<template>
  <nav flex text-gray-200>
    <router-link
      v-for="(link, i) in items"
      :key="i"
      :to="link.link"
      px-4
      py-2
      class="-mb-[1px]"
    >
      {{ link.name }}
    </router-link>
  </nav>
</template>

<style scoped>
nav a.router-link-active {
  @apply text-green border-b-2 border-green-500;
}
</style>

<script lang="ts" setup>
defineProps<{
  items: { link: string; name: string }[]
}>()
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
nav a.router-link-exact-active {
  @apply text-green-500 border-b-2 border-green-500;
}
</style>

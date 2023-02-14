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
      v-slot="{ href, isActive, navigate }"
      custom
    >
      <a
        :href="href"
        py-2
        px-4
        class="-mb-[1px]"
        :class="{ 'text-green-500 border-b-2 border-green-500': isActive }"
        @click="navigate"
      >
        {{ link.name }}
      </a>
    </router-link>
  </nav>
</template>

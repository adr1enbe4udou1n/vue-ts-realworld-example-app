<script lang="ts" setup>
const tag = ref("")

const currentTag = computed({
  get: () => tag.value,
  set: (value) => {
    tag.value = tag.value === value ? "" : value
  },
})

const menuItems = [
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
  <HomeLayout />
</template>

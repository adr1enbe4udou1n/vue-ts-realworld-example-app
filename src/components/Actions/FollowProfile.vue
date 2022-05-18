<script lang="ts" setup>
import { Profile } from "~/api"

defineProps<{
  profile: Profile
}>()
</script>

<template>
  <button
    type="button"
    rounded
    bg-gray-300
    py-1
    px-2
    text-sm
    flex
    items-center
    text-black
  >
    <i i-carbon-add class="-ml-1" mr-1></i>
    Follow {{ profile.username }}
  </button>
</template>

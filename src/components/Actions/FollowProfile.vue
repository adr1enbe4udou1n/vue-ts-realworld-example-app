<script lang="ts" setup>
import { Profile } from "~/api"

defineProps<{
  profile: Profile
}>()
</script>

<template>
  <IconButton icon="i-carbon-add" :label="`Follow ${profile.username}`" />
</template>

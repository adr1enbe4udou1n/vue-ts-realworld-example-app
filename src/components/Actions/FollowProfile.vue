<script lang="ts" setup>
import type { Profile } from "@/api"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const props = defineProps<{
  profile: Profile
}>()

const emit = defineEmits<{
  (e: "follow"): void
}>()

const icon = computed(() => {
  return props.profile.following ? "i-carbon-subtract" : "i-carbon-add"
})

const label = computed(() => {
  return props.profile.following ? "Unfollow" : "Follow"
})

const toggleFollow = async () => {
  userStore.ensureLoggedIn()

  emit("follow")
}
</script>

<template>
  <BaseButton
    type="button"
    size="sm"
    variant="secondary"
    v-if="userStore.user?.username !== profile.username"
    @click="toggleFollow"
  >
    <i :class="icon" />
    {{ `${label} ${profile.username}` }}
  </BaseButton>
</template>

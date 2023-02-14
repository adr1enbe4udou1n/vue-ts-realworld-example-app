<script lang="ts" setup>
import { followProfile, type Profile, unfollowProfile } from "@/api"
import { useUserStore } from "@/stores/user"
import BaseButton from "../BaseButton.vue"

const userStore = useUserStore()

const props = defineProps<{
  profile: Profile
}>()

const emit = defineEmits<{
  (e: "follow", toggle: boolean): void
}>()

const icon = computed(() => {
  return props.profile.following ? "i-carbon-subtract" : "i-carbon-add"
})

const label = computed(() => {
  return props.profile.following ? "Unfollow" : "Follow"
})

const toggleFollow = async () => {
  userStore.ensureLoggedIn()

  if (props.profile.following) {
    await unfollowProfile({ username: props.profile.username })
    emit("follow", false)
    return
  }

  await followProfile({ username: props.profile.username })
  emit("follow", true)
}
</script>

<template>
  <BaseButton
    size="sm"
    variant="secondary"
    v-if="userStore.user?.username !== profile.username"
    @click="toggleFollow"
  >
    <i :class="icon" />
    {{ `${label} ${profile.username}` }}
  </BaseButton>
</template>

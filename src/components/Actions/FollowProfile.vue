<script lang="ts" setup>
import { followProfile, Profile, unfollowProfile } from "~/api"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

const props = defineProps<{
  profile: Profile
}>()

const toggle = ref(props.profile.following)

const icon = computed(() => {
  return toggle.value ? "i-carbon-subtract" : "i-carbon-add"
})

const label = computed(() => {
  return toggle.value ? "Unfollow" : "Follow"
})

const toggleFollow = async () => {
  userStore.ensureLoggedIn()

  if (toggle.value) {
    await unfollowProfile({ username: props.profile.username })
    toggle.value = false
    return
  }

  await followProfile({ username: props.profile.username })
  toggle.value = true
}
</script>

<template>
  <IconButton
    v-if="userStore.user?.username !== profile.username"
    :icon="icon"
    :label="`${label} ${profile.username}`"
    @click="toggleFollow"
  />
</template>

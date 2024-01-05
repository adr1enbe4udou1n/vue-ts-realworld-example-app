<script lang="ts" setup>
import { followProfileToggle, type Profile } from "@/api"
import { useUserStore } from "@/stores/user"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

const queryClient = useQueryClient()
const userStore = useUserStore()

const props = defineProps<{
  profile: Profile
}>()

const mutation = useMutation({
  mutationFn: followProfileToggle,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["articles"],
    })
    queryClient.invalidateQueries({
      queryKey: ["profiles", props.profile.username],
    })
  },
})

const icon = computed(() => {
  return props.profile.following ? "i-carbon-subtract" : "i-carbon-add"
})

const label = computed(() => {
  return props.profile.following ? "Unfollow" : "Follow"
})

const toggleFollow = () => {
  userStore.ensureLoggedIn()

  mutation.mutate(props.profile)
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

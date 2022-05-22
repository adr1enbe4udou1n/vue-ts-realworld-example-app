<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string
    icon?: string
    link?: string
  }>(),
  {
    label: undefined,
    icon: undefined,
    link: undefined,
  }
)

defineEmits(["click"])
</script>

<template>
  <router-link v-if="link" :to="link" class="btn-icon">
    <i v-if="icon" :class="icon"></i>
    <span v-if="label">{{ label }}</span>
  </router-link>
  <button v-else type="button" class="btn-icon" @click="$emit('click')">
    <i v-if="icon" :class="icon"></i>
    <span v-if="label" hidden sm:inline>{{ label }}</span>
  </button>
</template>

<style scoped>
.btn-icon {
  @apply rounded bg-gray-300 py-1 px-2 text-sm flex items-center text-black flex-inline gap-1;
}
</style>

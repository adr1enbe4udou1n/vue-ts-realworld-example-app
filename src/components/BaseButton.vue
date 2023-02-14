<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md"
    variant?: "secondary" | "primary"
    to?: string
  }>(),
  {
    variant: "primary",
    size: "md",
  }
)

const classes = computed(() => {
  return [
    "rounded flex items-center inline-flex gap-1",
    {
      "py-1 px-2 text-sm": props.size === "sm",
      "p-4 text-xl": props.size === "md",
      "bg-green text-white": props.variant === "primary",
      "bg-gray-300 text-black": props.variant === "secondary",
    },
  ]
})

defineEmits(["click"])
</script>

<template>
  <router-link v-if="to" :to="to" :class="classes">
    <slot />
  </router-link>
  <button v-else :class="classes" @click="$emit('click')">
    <slot />
  </button>
</template>

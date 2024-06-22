<script lang="ts" setup>
import type { HandleValidation, ValidationProblemDetails } from "@/api"

const props = defineProps<{
  action: (handleValidation: HandleValidation) => void
}>()

const errors = ref<ValidationProblemDetails | undefined | null>(null)

const handleValidation = () => {
  props.action((e) => {
    errors.value = e
  })
}
</script>

<template>
  <form @submit.prevent="handleValidation">
    <AlertMessage :errors="errors" @close="errors = null" />
    <slot />
  </form>
</template>

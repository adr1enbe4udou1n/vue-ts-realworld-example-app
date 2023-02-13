<script lang="ts" setup>
import type { ValidationProblemDetails } from "@/api"

const props = defineProps<{
  action: () => Promise<ValidationProblemDetails | undefined>
}>()

const errors = ref<ValidationProblemDetails | null>(null)

const handleValidation = async () => {
  const errorResponse = await props.action()

  if (errorResponse) {
    errors.value = errorResponse
  }
}
</script>

<template>
  <form @submit.prevent="handleValidation">
    <AlertMessage :errors="errors" @close="errors = null" />
    <slot />
  </form>
</template>

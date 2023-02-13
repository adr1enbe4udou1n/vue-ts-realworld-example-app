<script lang="ts" setup>
export type Errors = {
  title: string
  errors: { [key: string]: string[] }
}

const props = defineProps<{
  action: () => Promise<Errors | null>
}>()

const errors = ref<Errors | null>(null)

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

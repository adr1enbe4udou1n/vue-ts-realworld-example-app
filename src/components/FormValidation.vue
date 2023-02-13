<script lang="ts" setup>
const props = defineProps<{
  action: () => Promise<any>
}>()

const errors = ref<{
  title: string
  errors: { [key: string]: string[] }
} | null>(null)

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

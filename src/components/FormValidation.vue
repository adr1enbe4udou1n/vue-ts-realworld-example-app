<script lang="ts" setup>
import type { OpArgType, TypedFetch } from "openapi-typescript-fetch"

const props = defineProps<{
  operation: TypedFetch<any>
  arg: OpArgType<any>
}>()

const errors = ref<{
  title: string
  errors: { [key: string]: string[] }
} | null>(null)

const emit = defineEmits<{
  (e: "success", data: any): void
}>()

const handleValidation = async () => {
  try {
    const response = await props.operation(props.arg)

    if (response?.ok) {
      emit("success", response.data)
    }
  } catch (e) {
    if (e instanceof props.operation.Error) {
      const error = e.getActualType()
      if (error.status === 400) {
        errors.value = error.data
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent="handleValidation">
    <AlertMessage :errors="errors" @close="errors = null" />
    <slot />
  </form>
</template>

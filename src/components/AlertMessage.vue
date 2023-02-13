<script lang="ts" setup>
import type { Errors } from "./FormValidation.vue"

defineProps<{
  errors?: Errors
}>()

defineEmits(["close"])
</script>

<template>
  <div v-if="errors" bg-red p-4 rounded text-white relative>
    <button type="button" absolute right-4 top-4 @click="$emit('close')">
      <i i-carbon-close block />
    </button>

    <p font-bold>
      {{ errors.title }}
    </p>
    <ul>
      <li v-for="(list, name) in errors.errors" :key="name">
        <strong>{{ name }} :</strong>
        <ul list-inside list-disc>
          <li v-for="error in list" :key="error">{{ error }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

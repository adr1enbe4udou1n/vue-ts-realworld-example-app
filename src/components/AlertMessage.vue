<script lang="ts" setup>
import { ValidationProblemDetails } from "~/api"

defineProps<{
  details: ValidationProblemDetails
}>()
</script>

<template>
  <div bg-red p-4 rounded text-white>
    <p font-bold>
      {{ details.title }}
    </p>
    <ul>
      <li v-for="(errors, name) in details.errors" :key="name">
        <strong>{{ name }} :</strong>
        <ul list-inside list-disc>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

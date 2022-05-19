<script lang="ts" setup>
import { useFormsStore } from "~/stores/forms"

const formsStore = useFormsStore()
</script>

<template>
  <div v-if="formsStore.errors" bg-red p-4 rounded text-white relative>
    <button type="button" absolute right-4 top-4 @click="formsStore.$reset()">
      <i i-carbon-close block />
    </button>

    <p font-bold>
      {{ formsStore.errors.title }}
    </p>
    <ul>
      <li v-for="(errors, name) in formsStore.errors.errors" :key="name">
        <strong>{{ name }} :</strong>
        <ul list-inside list-disc>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useFormsStore } from "~/stores/forms"

const forms = useFormsStore()
</script>

<template>
  <div v-if="forms.errors" bg-red p-4 rounded text-white relative>
    <button type="button" absolute right-4 top-4 @click="forms.$reset()">
      <i i-carbon-close block />
    </button>

    <p font-bold>
      {{ forms.errors.title }}
    </p>
    <ul>
      <li v-for="(errors, name) in forms.errors.errors" :key="name">
        <strong>{{ name }} :</strong>
        <ul list-inside list-disc>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

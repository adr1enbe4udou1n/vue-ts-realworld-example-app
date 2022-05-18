<script lang="ts" setup>
const props = defineProps<{ username: string }>()
console.log(props.username)
</script>

<template>
  <div bg-green text-white text-center py-8 mb-8>
    <h1 font-brand font-bold text-5xl mb-4>conduit</h1>
    <p font-sans>A place to share your knowledge.</p>
  </div>
  <div class="container" flex flex-col md:flex-row mb-8 gap-8>PROFILE</div>
</template>

<script setup lang="ts">
const props = defineProps({
  initial: {
    type: Number,
    default: 0,
  },
})

const { count, inc, dec } = useCounter(props.initial)
</script>

<template>
  <div>
    Count is {{ count }}
    <button class="inc" @click="inc()">+</button>
    <button class="dec" @click="dec()">-</button>
  </div>
</template>

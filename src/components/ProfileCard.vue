<script lang="ts" setup>
import { Profile } from "~/api"

interface Props {
  author: Profile
  date: string
  inline: boolean
}

withDefaults(defineProps<Props>(), {
  inline: false,
})

const getDate = (date: string) => {
  const month = new Date(date).toLocaleString("en", { month: "long" })
  return `${month} ${useDateFormat(date, "DD, YYYY").value}`
}
</script>

<template>
  <router-link :to="`/profiles/${author.username}`" flex items-center>
    <img
      rounded-full
      w-10
      h-10
      mr-2
      :src="author.image"
      :alt="author.username"
    />
    <div>
      <h2 font-sans text-green class="-mb-1">
        {{ author.username }}
      </h2>
      <time text-xs>{{ getDate(date) }}</time>
    </div>
  </router-link>
</template>

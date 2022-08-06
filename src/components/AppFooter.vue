<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core"

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <footer bg-gray-100 dark:bg-gray-800>
    <div class="container" py-4 flex items-center gap-4>
      <router-link to="/" font-brand text-green font-bold>
        conduit
      </router-link>
      <div ml-auto flex flex-row items-center>
        <p text-gray-300 text-sm font-sans text-right hidden lg:block>
          An interactive learing project from
          <a href="https://thinkster.io/" text-green>Thinkster</a>. Code &
          design licensed under MIT.
        </p>
        <button
          flex
          items-center
          justify-center
          ml-4
          dark:text-white
          @click="toggleDark()"
        >
          <i inline-block i="dark:carbon-moon carbon-sun" />
        </button>
      </div>
    </div>
  </footer>
</template>

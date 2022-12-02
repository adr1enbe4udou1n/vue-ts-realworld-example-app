<script setup lang="ts">
useHead({
  title: "Conduit",
  meta: [{ name: "description", content: "Conduit Vite Template" }],
})
</script>

<template>
  <div font-sans flex flex-col h-full>
    <AppHeader />
    <main flex-1>
      <Suspense>
        <RouterView />
      </Suspense>
    </main>
    <AppFooter />
  </div>
</template>

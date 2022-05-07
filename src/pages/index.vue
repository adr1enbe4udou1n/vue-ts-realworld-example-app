<template>
  <div>
    <h1 text-sm opacity-75 mb-4>HOME</h1>

    <CounterButton :initial="0" mb-4 />

    <router-link to="/about"> Go to About Page </router-link>
  </div>
</template>

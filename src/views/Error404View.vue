<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <main>
    <h1>Oops... 404</h1>
    <p>The page you are looking for is not available.</p>
    <router-link to="/">Home page</router-link>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

    h1 {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
}
</style>

<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "@/store/authStore";
</script>

<template>
  <div id="app">
    <p>isAuthenticated = {{ useAuthStore().isAuthenticated }}</p>
    <RouterView />
  </div>
</template>

<style scoped></style>
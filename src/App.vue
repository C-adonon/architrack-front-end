<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "@/store/authStore";
</script>

<template>
  <!-- <span>isAuthenticated = {{ useAuthStore().isAuthenticated }}</span> -->
  <RouterView />
</template>

<style scoped>
</style>
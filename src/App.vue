<script setup>
import { RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue';
const authentified = true;
</script>

<template>
  <div>Architrack</div>
  <div v-if="!authentified">
    <LoginView />
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped></style>

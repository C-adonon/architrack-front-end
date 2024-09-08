<script setup>
import SideBar from "@/components/nav/SideBar.vue";
import { useAuthStore } from "@/store/authStore";
</script>

<template>
  <main>
    <SideBar />
    <section class="container">
      <div>This is for admins</div>
      <div>{{ useAuthStore().user }}</div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 2vw;
}
</style>
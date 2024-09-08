<script setup>
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import Button from "primevue/button";

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  try {
    await authStore.logoutUser();
    router.push({ path: "/login" });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="logout-btn">
    <Button
      @click="logout"
      label="Logout"
      severity="danger"
      icon="pi pi-sign-out"
      text
    />
  </div>
</template>

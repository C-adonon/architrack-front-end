<script setup>
import { useAuthStore } from "@/store/authStore";
import { computed, onMounted, ref } from "vue";
const authStore = useAuthStore();

let currentUser = ref({});
let initials = ref("");
onMounted(() => {
  currentUser.value = authStore.user;
});

initials.value = computed(() => {
  let fn = currentUser.value.firstname.toUpperCase();
  let ln = currentUser.value.lastname.toUpperCase();
  return fn.charAt(0) + ln.charAt(0);
});
</script>

<template>
  <div class="user-ident" v-if="currentUser?.firstname">
    <div class="profile-picture">
      <!-- <img src="" alt="profile" /> -->
      <span>{{ initials }}</span>
    </div>
    <div class="info">
      <span class="name"
        >{{ currentUser?.firstname }} {{ currentUser?.lastname }}</span
      >
      <span class="department">{{ currentUser?.department?.name }}</span>
      <!-- <span class="role">{{ currentUser?.role }}</span> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/main.scss";

.user-ident {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0px 14px;

  .profile-picture {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--gray-200);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-md);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;

    .name {
      font-size: var(--font-size-md);
      font-weight: 600;
    }

    .department {
      font-size: var(--font-size-xs);
      color: var(--gray-500);
    }

    .role {
      font-size: var(--font-size-xs);
      color: var(--gray-500);
    }
  }
}
</style>
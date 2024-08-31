<script setup>
import { PrimeIcons } from "primevue/api";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

function isActive(path) {
  return path === router.currentRoute.value.path;
}
</script>

<template>
  <router-link :to="path">
    <div class="nav-tab" :class="{ active: isActive(path) }">
      <i :class="icon" style="font-size: 1.2rem"></i>
      <span class="nav-text">{{ text }}</span>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use "../../assets/main.scss";

a {
  text-decoration: none;
  //   color: var(--black);
  color: var(--gray-700);
  font-family: var(--font-medium);

  .nav-tab {
    display: flex;
    padding: 14px 24px;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    border-radius: 5px;
    border-left: 8px solid transparent;

    .nav-text {
      font-size: 1rem;
      text-transform: capitalize;
    }
  }
}

.nav-tab:hover {
  border-left: 8px solid var(--primary-blue, #2c54c5);
  background: rgba(44, 84, 197, 0.1);
}

.active {
  border-left: 8px solid var(--primary-blue, #2c54c5) !important;
  background: rgba(44, 84, 197, 0.1);
}
</style>
<script setup>
import { computed, onMounted, ref } from "vue";
import userService from "@/services/userService.js";

let currentUser = ref({});

onMounted(async () => {
  try {
    currentUser.value = (await userService.getCurrentUser()).data;
  } catch (error) {
    console.error(error);
  }
});

const initials = computed(() => {
  let fn = currentUser.value.firstname.toUpperCase();
  let ln = currentUser.value.lastname.toUpperCase();
  return fn.charAt(0) + ln.charAt(0);
});

const role = computed(() => {
  return currentUser.value.role.replace("_", " ").toLowerCase();
});
</script>

<template>
  <div class="user-ident" v-if="currentUser?.firstname">
    <div class="profile-picture">
      <span>{{ initials }}</span>
    </div>
    <div class="info">
      <span class="name"
        >{{ currentUser?.firstname }} {{ currentUser?.lastname }}</span
      >
      <span class="department">{{ currentUser?.department?.name }}</span>
      <span class="role">{{ role }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../assets/main.scss";
@use "sass:color";

// $colors: var(--yellow) var(--blue) var(--green) var(--red);
// // $colors: $yellow $blue $green $red;

// @function randomColor($index) {
//   @return nth($colors, $index);
// }

// @function lighten($color) {
//   @return color.scale($color, $lightness: -10%, $saturation: 10%);
// }

// $current-color: randomColor(random(4));
// $light-color: lighten($current-color);

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
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-md);
    // background-color: $light-color;
    background-color: lightgray;

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
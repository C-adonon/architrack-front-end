<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span class="nav-subtitle-text">{{ text }}</span>
</template>

<style lang="scss" scoped>
@use "../../assets/main.scss";
.nav-subtitle-text {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--gray-500);
  text-transform: uppercase;
  // margin-bottom: 8px;
}
</style>
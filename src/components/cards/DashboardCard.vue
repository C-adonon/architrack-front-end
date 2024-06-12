<script setup>
import { ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";

const props = defineProps({
  title: String,
  content: Number,
});
</script>

<template>
  <Card class="dashboard-card">
    <template #title>{{ title }}</template>
    <template #content>
      <div class="content">
        <p class="m-0">
          {{ content }}
        </p>
        <Button icon="pi pi-arrow-up-right" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.dashboard-card {
  width: 32%;
  border: 0.5px solid var(--surface-200);
}

p {
  font-size: 4rem;
  font-weight: bold;
  margin: 0;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
<script setup>
import { onMounted, ref } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const props = defineProps({
  type: {
    type: String,
    default: "info",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: String,
});

onMounted(() => {
  toast.add({
    severity: props.type,
    summary: props.title,
    detail: props.content,
    life: 3000,
  });
});
</script>

<template>
  <Toast />
</template>
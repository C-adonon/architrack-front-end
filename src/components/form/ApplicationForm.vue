<script setup>
import { onMounted, ref, computed, onBeforeMount } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import MultiSelect from "primevue/multiselect";
import Tags from "@/components/pills_tags/Tags.vue";

const props = defineProps({
  name: String,
  description: String,
  applicationType: String,
  department: "",
  state: "",
  validationStatus: "",
  provider: "",
  hostingType: "",
  contractType: "",
  criticality: "",
  businessCapability: "",
  languages: [],
  softwares: [],
});

const appData = ref({});
</script>

<template>
  <div>
    <h1>p</h1>
  </div>
</template>

<style scoped>
</style>
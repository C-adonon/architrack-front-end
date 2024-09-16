<script setup>
import { ref, defineProps } from "vue";
import ApplicationService from "@/services/applicationService.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

let deleteProductsDialog = ref(false);
let product = ref(null);

function deleteSelectedProducts() {
  console.log("Delete selected products");
}
</script>

<template>
  <Dialog
    v-model:visible="deleteProductsDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >Are you sure you want to delete the selected accountables ?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        text
        @click="deleteProductsDialog = false"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        text
        @click="deleteSelectedProducts"
      />
    </template>
  </Dialog>
</template>
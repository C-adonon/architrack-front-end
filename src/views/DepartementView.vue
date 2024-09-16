<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProviderService from "@/services/providerService.js";
import DepartmentService from "@/services/departmentService.js";
import BusinessCapabilityService from "@/services/businessCapabilityService.js";
import pattern from "@/assets/static/pattern.png";
import SideBar from "@/components/nav/SideBar.vue";
import Button from "primevue/button";
import OrganizationChart from "primevue/organizationchart";
import Card from "primevue/card";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

const route = useRoute();
let department = ref({});
let depId = ref(route.params.id);
let chartMap = ref({});
let addBcDialog = ref(false);
let businessCapability = ref({
  name: "",
  departmentId: depId.value,
});

onMounted(async () => {
  try {
    department.value = (
      await DepartmentService.getDepartmentById(depId.value)
    ).data;
    console.log("Department", department.value);

    chartMap.value = {
      id: department.value.id,
      label: department.value.name,
      styleClass: "bg-red-100 border-round-xl",
      children: department.value.businessCapability.map((cap) => {
        return {
          styleClass: "bg-blue-100 border-round-xl",
          label: cap.name,
        };
      }),
    };

    console.log("ChartMap", chartMap.value);
  } catch (error) {
    console.error(error);
  }
});

function openBcDialog() {
  addBcDialog.value = true;
}

async function createBc() {
  console.log(businessCapability.value);
  let res = BusinessCapabilityService.createBusinessCapability(
    businessCapability.value
  );
  if (res.status === 201) {
    department.value = (
      await DepartmentService.getDepartmentById(depId.value)
    ).data;
  }
  addBcDialog.value = false;
}
</script>

<template>
  <main>
    <SideBar />
    <section class="container overflow-x-hidden" v-if="department">
      <h1>
        Department : <span class="dep-name">{{ department.name }}</span>
      </h1>

      <div class="flex flew-row justify-content-between my-3">
        <p>
          This department has
          {{ department.businessCapability?.length }} capabilities
        </p>
        <Button
          label="Add Capability"
          icon="pi pi-plus"
          class="p-button-success"
          @click="openBcDialog"
        />
      </div>

      <Card class="w-full overflow-auto p-6">
        <template #content>
          <div>
            <OrganizationChart class="w-1" :value="chartMap" collapsible>
              <template #default="slotProps">
                <span class="text-center">{{ slotProps.node.label }}</span>
              </template>
            </OrganizationChart>
          </div>
        </template>
      </Card>
    </section>
    <Dialog
      v-model:visible="addBcDialog"
      :style="{ width: '450px' }"
      :modal="true"
    >
      <template #header>
        <h3>Add a new business capability</h3>
      </template>

      <div class="confirmation-content">
        <div>
          <label for="name">Business capability name</label>
          <InputText
            v-model="businessCapability.name"
            placeholder="Business capability name"
            class="w-full"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          severity="danger"
          text
          @click="addBcDialog = false"
        />
        <Button
          label="Create"
          icon="pi pi-check"
          severity="success"
          text
          @click="createBc"
        />
      </template>
    </Dialog>
  </main>
</template>

<style lang="scss" scoped>
@use "../assets/main.scss";

.container {
  padding: 0 2vw;
}

.dep-name {
  padding: 0.7rem;
  border: solid 2px;
  font-weight: bold;
  border-radius: 10px;
}
</style>
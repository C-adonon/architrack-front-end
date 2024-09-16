<script setup>
import { onMounted, ref } from "vue";
import SideBar from "@/components/nav/SideBar.vue";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import DepartmentService from "@/services/departmentService.js";
import businessCapabilityService from "@/services/businessCapabilityService";
import OrganizationChart from "primevue/organizationchart";
import Card from "primevue/card";
import pattern from "../assets/static/pattern.png";
import { RouterLink, useRouter, RouterView, useRoute } from "vue-router";

const router = useRouter();

const departments = ref([]);
const businessCapabilities = ref([]);
let depData = ref([]);
const columns = ref([{ field: "name", header: "Name", expander: true }]);

onMounted(async () => {
  try {
    departments.value = (await DepartmentService.getAllDepartments()).data;
    businessCapabilities.value = (
      await businessCapabilityService.getAllBusinessCapabilities()
    ).data;

    console.log("Departments", departments.value);
    console.log("Business Capabilities", businessCapabilities.value);
    console.log(departments.value[0]);

    depData.value = departments.value.map((department) => {
      return {
        id: department.id,
        label: department.name,
        styleClass: "bg-indigo-100 border-round-xl",
        children: department.businessCapability.map((bc) => {
          return {
            label: bc.name,
          };
        }),
      };
    });

    console.log("Test", depData.value);
  } catch (error) {
    console.error(error);
  }
});

const goToDepartment = (id) => {
  console.log("Go to department");
  router.push({ path: `/departments/${id}` });
};
</script>

<template>
  <main>
    <SideBar />
    <section v-if="depData" class="container overflow-x-hidden">
      <h1>Business Process</h1>
      <h2>All departments</h2>
      <div class="grid gap-4">
        <Card
          class="col-3 p-0"
          v-for="dep in departments"
          :key="dep.id"
          @click="goToDepartment(dep.id)"
          style="cursor: pointer;"
        >
          <template #header>
            <img :src="pattern" alt="Card" class="w-full" />
          </template>
          <template #title>{{ dep.name }}</template>
        </Card>
      </div>

      <!-- <div class="w-full overflow-auto" v-for="data in depData" :key="data.id">
        <OrganizationChart class="w-1" :value="data" collapsible>
          <template #default="slotProps">
            <span class="text-center">{{ slotProps.node.label }}</span>
          </template>
        </OrganizationChart>
      </div> -->

      <!-- <div>
        <TreeTable :value="depData">
          <Column
            v-for="col of columns"
            :key="col.id"
            :field="col.field"
            :header="col.header"
            :expander="col.expander"
          >
            <template #body="slotProps">
              <span>{{ slotProps.node.label }}</span>
            </template>
          </Column>
        </TreeTable>
      </div> -->

      <!-- <div v-if="departments">
        <TreeTable :value="departments">
          <Column field="name" header="Name"> </Column>
        </TreeTable>
      </div> -->
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "../assets/main.scss";

.container {
  padding: 0 2vw;
}

img {
  height: 20vh;
  width: 100%;
  object-fit: cover;
}
</style>
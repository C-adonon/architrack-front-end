<script setup>
import { onMounted, ref, computed, onBeforeMount } from "vue";
import applicationService from "../services/applicationService";
import Tags from "./../components/pills_tags/Tags.vue";
import SideBar from "@/components/nav/SideBar.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import MultiSelect from "primevue/multiselect";
import Row from "primevue/row";
import { FilterMatchMode } from "primevue/api";
import { useDataTableStore } from "@/store/dataTableStore";
import { RouterLink, useRouter, RouterView, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const dataTableFilters = useDataTableStore();

// DATA TABLE PARAMS
const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};
const loading = ref(true);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  "applicationType.name": { value: null, matchMode: FilterMatchMode.EQUALS },
  "department.name": { value: null, matchMode: FilterMatchMode.EQUALS },
  state: { value: null, matchMode: FilterMatchMode.EQUALS },
  validationStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const statuses = ref([
  { label: "Draft", value: "DRAFT" },
  { label: "To be validated", value: "TO_BE_VALIDATED" },
  { label: "Validated", value: "VALIDATED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Archived", value: "ARCHIVED" },
  { label: "Unknown", value: "UNKNOWN" },
]);

const getSeverity = (statuses) => {
  switch (statuses) {
    case "REJECTED":
      return "danger";

    case "VALIDATED":
      return "success";

    case "DRAFT":
      return "info";

    case "TO_BE_VALIDATED":
      return "warning";

    case "ARCHIVED":
      return "secondary";

    case "UNKNOWN":
      return "help";
  }
};

const applicationTypes = ref([]);
const departments = ref([]);
const states = ref([]);
const applications = ref([]);
let err = ref({ msg: "", value: false });
const onRowSelect = (event) => {
  router.push({ path: `/applications/${event.data.id}` });
};

async function handleDataFilter() {
  try {
    departments.value = await dataTableFilters.getDepartments();
    applicationTypes.value = await dataTableFilters.getApplicationTypes();
    states.value = await dataTableFilters.getApplicationStates();
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  try {
    applications.value = (await applicationService.getAllApplications()).data;
    console.log(applications.value);
    loading.value = false;
    handleDataFilter();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <main>
    <SideBar />
    <section v-if="applications" class="container">
      <h1>Applications</h1>
      <DataTable
        v-model:filters="filters"
        :value="applications"
        ref="dt"
        paginator
        stripedRows
        removableSort
        :rows="10"
        dataKey="id"
        filterDisplay="row"
        :loading="loading"
        selectionMode="single"
        :metaKeySelection="false"
        @rowSelect="onRowSelect"
        :globalFilterFields="[
          'name',
          'applicationType.name',
          'department.name',
          'validationStatus',
          'state',
        ]"
      >
        <template #empty> No application found. </template>
        <template #loading> Loading application data. Please wait. </template>
        <template #header>
          <div class="flex flex-row justify-content-between">
            <Button
              icon="pi pi-file-excel"
              label="Export"
              @click="exportCSV($event)"
            />
            <router-link to="/applications/new">
              <Button
                icon="pi pi-plus"
                label="Create a new application"
                severity="success"
                class="p-ml-2"
                @click="dt.filter($event)"
              />
            </router-link>
          </div>
        </template>
        <Column field="name" header="Name" style="min-width: 12rem" sortable>
          <template #body="{ data }">
            {{ data.name }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              class="p-column-filter"
              placeholder="Search by name"
            />
          </template>
        </Column>
        <Column
          header="Application type"
          filterField="applicationType.name"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            {{ data.applicationType.name }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="applicationTypes.map((type) => type.name)"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 12rem"
              :showClear="true"
            />
          </template>
        </Column>
        <Column
          header="Department"
          filterField="department.name"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            {{ data.department.name }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="departments.map((department) => department.name)"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 12rem"
              :showClear="true"
            />
          </template>
        </Column>
        <Column
          header="State"
          filterField="state"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            {{ data.state }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="states"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 12rem"
              :showClear="true"
            />
          </template>
        </Column>
        <Column
          field="validationStatus"
          header="Status"
          :showFilterMenu="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <Tag
              :value="data.validationStatus"
              :severity="getSeverity(data.validationStatus)"
            />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="statuses.map((status) => status.value)"
              placeholder="Select One"
              class="p-column-filter"
              style="min-width: 12rem"
              :showClear="true"
            >
              <template #option="slotProps">
                <Tag
                  :value="slotProps.option"
                  :severity="getSeverity(slotProps.option)"
                />
              </template>
            </Dropdown>
          </template>
        </Column>
      </DataTable>
    </section>
  </main>
</template>

<style scoped lang='scss'>
// .container {
//   padding: 0 20px;
// }
</style>
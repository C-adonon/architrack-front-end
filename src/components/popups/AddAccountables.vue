<script setup>
import { ref, onMounted, computed } from "vue";
import userService from "@/services/userService.js";
import applicationService from "@/services/applicationService.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Checkbox from "primevue/checkbox";
import { useRoute } from "vue-router";

const route = useRoute();

let displayBasic = ref(true);
let allUsers = ref([]);
let newAccountableList = ref([]);
let currentAccountables = ref([]);
let users = ref([]);
let checked = ref(false);
let filteredUsers = ref([]);

let emit = defineEmits(["sendAccountables", "closeD"]);

onMounted(async () => {
  try {
    allUsers.value = (await userService.getAllUsers()).data;
    console.log("All users : ", allUsers.value);

    currentAccountables.value = (
      await applicationService.getApplicationById(route.params.id)
    ).data.accountables;
    console.log("Current accountables : ", currentAccountables.value);

    // newAccountableList.value = (
    //   await applicationService.getApplicationById(route.params.id)
    // ).data.accountables;

    // console.log(allUsers.value);
    // console.log(newAccountableList.value);
  } catch (error) {
    console.error(error);
  }
});

function saveProduct() {
  console.log("Save product");
}

function updateNewAccountableList(uuid) {
  console.log("before anything : " + newAccountableList.value);

  if (newAccountableList.value.includes(uuid)) {
    newAccountableList.value = newAccountableList.value.filter(
      (value) => value !== uuid
    );
    console.log(newAccountableList.value);
  } else {
    newAccountableList.value = [...newAccountableList.value];
    console.log(newAccountableList.value);
  }
}

function checkIfAlreadyAccountable(id) {
  currentAccountables.value.forEach((acc) => {
    if (acc.userId === id) {
      console.log("Already accountable", id);
      return true;
    }
  });
}
</script>

<template>
  <Dialog
    :style="{ width: '40vw' }"
    header="Add Accountables"
    :modal="true"
    class="p-fluid"
    :draggable="true"
  >
    <div>{{ newAccountableList }}</div>
    <DataTable
      :value="allUsers"
      dataKey="id"
      :paginator="true"
      stripedRows
      :rows="10"
      v-if="allUsers"
      v-model:selection="newAccountableList"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem">
        <template #body="{ data }">
          <!-- <Checkbox
            v-model="newAccountableList"
            :value="data"
          /> -->
          <Checkbox
            v-model="newAccountableList"
            :value="data"
            v-if="!checkIfAlreadyAccountable(data.id)"
            @change="updateNewAccountableList(data.uuid)"
          />
        </template>
      </Column>
      <Column field="name" header="Name">
        <template #body="{ data }">
          {{ data.firstname }} {{ data.lastname }}
        </template>
      </Column>
      <Column field="role" header="Role">
        <template #body="{ data }">
          {{ data.role }}
        </template>
      </Column>
    </DataTable>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="secondary"
        text
        @click="$emit('closeD', false)"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        severity="success"
        text
        @click="saveProduct"
      />
    </template>
  </Dialog>
</template>

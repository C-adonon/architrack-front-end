<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import applicationService from "@/services/applicationService.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import NewAcc from "../popups/AddAccountables.vue";
import Tag from "primevue/tag";
import AddAccountables from "@/components/popups/AddAccountables.vue";
import RemoveAccountables from "@/components/popups/RemoveAccountables.vue";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const props = defineProps({
  appId: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const selectedAccountables = ref([]);
const openAdd = ref(false);
const deleteAccountableDialog = ref(false);
const updateAccountableList = ref([]);
const openAddAccDialog = ref(false);
const person = ref({});
const accountables = ref([]);
const authorId = ref({});

onMounted(async () => {
  try {
    let res = (
      await applicationService.getApplicationById(parseInt(props.appId))
    ).data;
    accountables.value = res.accountables;
    authorId.value = res.author.id;
  } catch (error) {
    console.error(error);
  }
});

// DELETE ACCOUNTABLE
const deleteProduct = async () => {
  updateAccountableList.value = accountables.value.filter(
    (val) => val.userId !== person.value.user.id
  );
  updateAccountableList.value = updateAccountableList.value.map(
    (val) => val.user.id
  );
  await updateAccountables(updateAccountableList.value);
  deleteAccountableDialog.value = false;
  person.value = {};
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Accountable Deleted",
    life: 3000,
  });
};

const confirmDeleteSelected = (id) => {
  person.value = accountables.value.find((acc) => acc.user.id === id);
  deleteAccountableDialog.value = true;
};

async function updateAccountables(newAccountableList) {
  try {
    let updateApplication = {
      accountables: newAccountableList,
    };
    let res = await applicationService.updateApplication(
      props.appId,
      updateApplication
    );
    console.log(res);
    accountables.value = res.data.accountables;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <Toast />
  <DataTable
    :value="accountables"
    :paginator="true"
    stripedRows
    :rows="10"
    v-model:selection="selectedAccountables"
    v-if="accountables && authorId"
  >
    <template #empty> No accountables found. </template>
    <template #loading> Loading accountables data. Please wait. </template>
    <template #header>
      <Button
        label="Add accountables"
        icon="pi pi-plus"
        severity="success"
        class="mr-2"
        @click="openAdd = true"
      />
    </template>
    <Column field="name" header="Name">
      <template #body="{ data }">
        <div class="name">
          {{ data.user.firstname }}

          {{ data.user.lastname }}

          <Tag
            v-if="data.user.id == authorId"
            value="Author"
            severity="warning"
          />
        </div>
        <div class="department">
          {{ data.user.department.name }}
        </div>
      </template>
    </Column>
    <Column field="email" header="Email">
      <template #body="{ data }">
        {{ data.user.email }}
      </template>
    </Column>
    <Column field="role" header="Role">
      <template #body="{ data }">
        {{ data.user.role }}
      </template>
    </Column>
    <Column field="action" header="Action" style="width: 6rem">
      <template #body="{ data }">
        <Button
          severity="danger"
          label="Remove"
          v-if="data.user.id != authorId"
          icon="pi pi-trash"
          class="p-button-rounded p-button-text"
          @click="confirmDeleteSelected(data.user.id)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="deleteAccountableDialog"
    :style="{ width: '450px' }"
    :modal="true"
  >
    <template #header>
      <h3>
        <i
          class="pi pi-exclamation-triangle mr-3"
          style="font-size: 1.5rem; color: red"
        />Confirm this action
      </h3>
    </template>

    <div class="confirmation-content">
      <span v-if="person"
        >Are you sure you want to remove
        <b>{{ person.user.firstname }} {{ person.user.lastname }}</b> as an
        accountable on this application ?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        severity="danger"
        text
        @click="deleteAccountableDialog = false"
      />
      <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
    </template>
  </Dialog>

  <AddAccountables v-model:visible="openAdd" @closeD="openAdd = false" />
</template>

<style lang="scss" scoped>
@use "../../assets/main.scss";
</style>
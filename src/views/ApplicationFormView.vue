<script setup>
import { onMounted, ref, computed } from "vue";
import { useOptionsStore } from "@/store/optionsStore";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import applicationService from "@/services/applicationService";
import ApplicationForm from "@/components/form/ApplicationForm.vue";
import SideBar from "@/components/nav/SideBar.vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import MultiSelect from "primevue/multiselect";
import Tags from "@/components/pills_tags/Tags.vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Textarea from "primevue/textarea";
import AccTable from "@/components/tables/AccTable.vue";
import { useAuthStore } from "@/store/authStore";
import userService from "@/services/userService.js";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const options = useOptionsStore();

let states = ref([]);
let contractTypes = ref([]);
let hostingTypes = ref([]);
let criticalities = ref([]);
let businessCapabilities = ref([]);
let departments = ref([]);
let applicationTypes = ref([]);
let providers = ref([]);
let languages = ref([]);
let softwares = ref([]);
let validationStatuses = ref({});
let author = ref({});
let application = ref({
  name: "",
  description: "",
  version: "",
  comment: "",
  applicationType: {},
  applicationTypeId: null,
  department: {},
  departmentId: null,
  state: "",
  validationStatus: "",
  provider: "",
  providerId: null,
  hostingType: "",
  contractType: "",
  criticality: "",
  businessCapability: "",
  businessCapabilityId: null,
  author: {},
  authorId: null,
  languages: [],
  softwares: [],
  accountables: [],
});
let updatedApp = ref({});
let applicationId = ref("");
let allOptionsReady = ref(false);

onMounted(async () => {
  applicationId.value = route.params.id;
  states.value = await options.getApplicationStates();
  contractTypes.value = await options.getContractTypes();
  hostingTypes.value = await options.getHostingTypes();
  criticalities.value = await options.getCriticalities();
  businessCapabilities.value = await options.getBusinessCapabilities();
  departments.value = await options.getDepartments();
  applicationTypes.value = await options.getApplicationTypes();
  providers.value = await options.getProviders();
  languages.value = await options.getLanguages();
  softwares.value = await options.getSoftwares();
  validationStatuses.value = await options.getValidationStatuses();

  if (
    states.value &&
    contractTypes.value &&
    hostingTypes.value &&
    criticalities.value &&
    businessCapabilities.value &&
    departments.value &&
    applicationTypes.value &&
    providers.value &&
    languages.value &&
    softwares.value &&
    validationStatuses.value
  )
    allOptionsReady.value = true;

  if (route.params.id) {
    let response = (
      await applicationService.getApplicationById(route.params.id)
    ).data;
    application.value = response;
    console.log("app data 1 : ", application.value);
  }
});

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

async function updateApplication() {
  console.log(updatedApp.value);
  let response = await applicationService.updateApplication(
    route.params.id,
    updatedApp.value
  );
  console.log(response);
}

async function sendForValidation() {
  updatedApp.value = {
    ...updatedApp.value,
    validationStatus: "TO_BE_VALIDATED",
  };
  let response = await applicationService.updateApplication(
    route.params.id,
    updatedApp.value
  );
  console.log(response);
}

async function createApplication() {
  console.log("updatedApp: ", updatedApp.value);
  let response = await applicationService.createApplication(updatedApp.value);
  console.log(response);
  if (response.status === 201) {
    router.push({ path: `/applications/${response.data.id}` });
  } else {
    console.log("error");
  }
}

const handleNewValues = (newValues) => {
  console.log("newValues: ", newValues);
  updatedApp.value = { ...updatedApp.value, ...newValues };
  console.log(updatedApp.value);
};
</script>

<template>
  <main>
    <SideBar />
    <section
      v-if="
        application &&
        contractTypes &&
        hostingTypes &&
        criticalities &&
        businessCapabilities &&
        departments &&
        applicationTypes &&
        providers &&
        languages &&
        softwares &&
        validationStatuses
      "
      class="flex flex-column justify-content-center gap-3 w-11 m-auto"
    >
      <div class="flex flex-row justify-content-between align-items-center">
        <h1>Application Form</h1>
        <Badge
          v-if="application.validationStatus"
          :value="application.validationStatus"
          :severity="getSeverity(application.validationStatus)"
          size="large"
        />
      </div>

      <section id="general">
        <h3 class="section-name" style="text-transform: uppercase">
          general information
        </h3>
        <div>
          <label for="name" class="font-medium block mb-2"
            >Name<span class="required-field">*</span></label
          >
          <InputText
            id="name"
            class="w-full"
            type="text"
            v-model="application.name"
            v-on:change="handleNewValues({ name: $event.target.value })"
          />
        </div>

        <div
          id="business-process"
          class="flex flex-row align-items-center justify-content-between flex-wrap"
        >
          <div class="lg:w-5">
            <label for="department" class="font-medium block mb-2"
              >Department</label
            >
            <Dropdown
              id="department"
              class="w-full"
              v-model="application.department"
              v-on:change="handleNewValues({ departmentId: $event.value.id })"
              :options="departments"
              optionLabel="name"
              placeholder="Select a department"
            />
          </div>
          <div class="lg:w-5">
            <label for="businessCapability" class="font-medium block mb-2"
              >Business capability</label
            >
            <Dropdown
              id="businessCapability"
              class="w-full"
              v-model="application.businessCapabilityId"
              v-on:change="
                handleNewValues({ businessCapabilityId: $event.value.id })
              "
              :options="businessCapabilities"
              optionLabel="name"
              placeholder="Select a business capability"
            />
          </div>
        </div>

        <div>
          <label for="version" class="font-medium block mb-2">Version</label>
          <InputText
            id="version"
            class="w-full"
            v-model="application.version"
            v-on:change="handleNewValues({ version: $event.target.value })"
          />
        </div>

        <div>
          <label for="criticality" class="font-medium block mb-2"
            >Criticality<span class="required-field">*</span></label
          >
          <Dropdown
            id="criticality"
            class="w-full"
            v-model="application.criticality"
            v-on:change="handleNewValues({ criticality: $event.value })"
            :options="criticalities"
            placeholder="Select a criticality"
          />
        </div>

        <div>
          <label for="provider" class="font-medium block mb-2">Provider</label>
          <Dropdown
            id="provider"
            class="w-full"
            v-model="application.provider"
            v-on:change="handleNewValues({ providerId: $event.value.id })"
            :options="providers"
            optionLabel="name"
            placeholder="Select a provider"
          />
        </div>

        <div>
          <label for="contractType" class="font-medium block mb-2"
            >Type of contract</label
          >
          <Dropdown
            id="contractType"
            class="w-full"
            v-model="application.contractType"
            v-on:change="handleNewValues({ contractType: $event.value })"
            :options="contractTypes"
            placeholder="Select a contract type"
          />
        </div>

        <div>
          <label for="description" class="font-medium block mb-2"
            >Description</label
          >
          <InputText
            id="description"
            class="w-full"
            v-model="application.description"
            v-on:change="handleNewValues({ description: $event.target.value })"
          />
        </div>
      </section>

      <section id="technical">
        <h3 class="section-name" style="text-transform: uppercase">
          technical information
        </h3>

        <div>
          <label for="applicationType" class="font-medium block mb-2"
            >Type of application<span class="required-field">*</span></label
          >
          <Dropdown
            id="applicationType"
            class="w-full"
            v-model="application.applicationType"
            v-on:change="
              handleNewValues({ applicationTypeId: $event.value.id })
            "
            :options="applicationTypes"
            optionLabel="name"
            placeholder="Select an application type"
          />
        </div>

        <div>
          <label for="state" class="font-medium block mb-2"
            >State of application<span class="required-field">*</span></label
          >
          <Dropdown
            id="state"
            class="w-full"
            v-model="application.state"
            v-on:change="handleNewValues({ state: $event.value })"
            :options="states"
            placeholder="Select a state"
          />
        </div>

        <div>
          <label for="hostingType" class="font-medium block mb-2"
            >Type of hosting</label
          >
          <Dropdown
            id="hostingType"
            class="w-full"
            v-model="application.hostingType"
            v-on:change="handleNewValues({ hostingType: $event.value })"
            :options="hostingTypes"
            placeholder="Select a hosting type"
          />
        </div>

        <div
          class="flex flex-row align-items-center justify-content-between flex-wrap gap-3"
        >
          <div class="lg:w-5">
            <label for="languages" class="font-medium block mb-2"
              >Languages</label
            >
            <MultiSelect
              id="languages"
              class="w-full"
              display="chip"
              v-model="application.languages"
              v-on:change="
                handleNewValues({
                  languages: $event.value.map((lang) => lang.id),
                })
              "
              :options="languages"
              optionLabel="name"
              placeholder="Select languages"
            />
          </div>

          <div class="lg:w-5">
            <label for="softwares" class="font-medium block mb-2"
              >Softwares</label
            >
            <MultiSelect
              id="softwares"
              class="w-full"
              display="chip"
              v-model="application.softwares"
              v-on:change="
                handleNewValues({
                  softwares: $event.value.map((soft) => soft.id),
                })
              "
              :options="softwares"
              optionLabel="name"
              placeholder="Select softwares"
            />
          </div>
        </div>
      </section>

      <div>
        <label for="comment" class="font-medium block mb-2">Comment</label>
        <Textarea
          id="comment"
          class="w-full"
          v-model="application.comment"
          v-on:change="handleNewValues({ comment: $event.target.value })"
          rows="3"
          cols="30"
        />
      </div>

      <section id="Accountables">
        <h3 class="section-name" style="text-transform: uppercase">
          Accountables
        </h3>

        <div class="accountable-table">
          <AccTable :appId="route.params.id" />
        </div>
      </section>

      <div
        class="flex flex-row justify-content-between my-3"
        v-if="route.params.id"
      >
        <router-link to="/">
          <Button label="Close" severity="danger" link />
        </router-link>

        <div>
          <Button
            class="mr-6"
            label="Save & send for validation"
            severity="success"
            @click="sendForValidation()"
          />
          <Button
            label="Save as draft"
            severity="warning"
            @click="updateApplication()"
          />
        </div>
      </div>

      <div class="flex flex-row justify-content-end my-3" v-else>
        <Button
          label="Create"
          severity="success"
          @click="createApplication()"
        />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "../assets/main.scss";

.container {
  padding: 0 20px;
}

.section-name {
  font-size: 1rem;
  margin: 1rem 0;
  color: var(--gray-700);
}
</style>
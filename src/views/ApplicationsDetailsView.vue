<script setup>
import { RouterLink, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
// Components
import Pill from "./../components/pills_tags/Pill.vue";
import TextInput from "./../components/inputs/TextInput.vue";
import TextArea from "./../components/inputs/TextArea.vue";
import Select from "./../components/selects/Select.vue";
import Checkbox from "../components/inputs/CheckboxGroup.vue";
import AccountablesTable from "./../components/tables/AccountablesTable.vue";
// Services
import applicationService from "../services/applicationService";
import businessCapabilityService from "../services/businessCapabilityService";
import departmentService from "../services/departmentService";
import applicationTypeService from "../services/applicationTypeService";
import providerService from "../services/providerService";
import languageService from "../services/languageService";
import softwareService from "../services/softwareService";

const route = useRoute();

// Current application
let application = ref({});
// Updated application
let updatedApp = ref({});
// Options for selects (Enums)
let states = ref([]);
let contractTypes = ref([]);
let hostingTypes = ref([]);
let criticalities = ref([]);
// Options for selects (Objects)
let businessCapabilities = ref([]);
let departments = ref([]);
let applicationTypes = ref([]);
let providers = ref([]);
let languages = ref([]);
let softwares = ref([]);
let err = ref({ msg: "", value: false });

onMounted(async () => {
  try {
    // Gets current application
    application.value = await applicationService.getApplicationById(
      route.params.id
    );
    // get all options
    states.value = (await applicationService.getApplicationStates()).map(
      (opt) => ({ id: opt, name: opt })
    );
    contractTypes.value = (
      await applicationService.getApplicationContractTypes()
    ).map((opt) => ({ id: opt, name: opt }));
    hostingTypes.value = (
      await applicationService.getApplicationHostingTypes()
    ).map((opt) => ({ id: opt, name: opt }));
    criticalities.value = (
      await applicationService.getApplicationCriticalities()
    ).map((opt) => ({ id: opt, name: opt }));
    // get all options
    businessCapabilities.value =
      await businessCapabilityService.getAllBusinessCapabilities();
    departments.value = await departmentService.getAllDepartments();
    applicationTypes.value =
      await applicationTypeService.getAllApplicationTypes();
    providers.value = await providerService.getAllProviders();
    languages.value = await languageService.getAllLanguages();
    softwares.value = await softwareService.getAllSoftwares();
  } catch (error) {
    console.error(error);
    err.value = { msg: error, value: true };
  }
});

async function updateApplication() {
  console.log(updatedApp.value);
  let response = await applicationService.updateApplication(
    route.params.id,
    updatedApp.value
  );
  // if the request is successful, alert the user
  console.log(response);
}

const handleNewValues = (newValues) => {
  console.log("newValues: ", newValues);
  updatedApp.value = { ...updatedApp.value, ...newValues };
  console.log(updatedApp.value);
};
</script>

<template>
  <button class="return">
    <RouterLink to="/applications">RETURN</RouterLink>
  </button>
  <section
    v-if="Object.keys(application).length > 0 && states.length > 0"
    class="app-details"
  >
    <header class="app-form-header">
      <h2>{{ application.name }}</h2>
      <Pill :text="application.validationStatus" />
    </header>
    <fieldset class="app-form">
      <div class="app-form-section general">
        <h3>General information</h3>
        <TextInput
          name="name"
          label="name"
          :value="application.name"
          @input="
            (event) =>
              (updatedApp = { ...updatedApp, name: event.target.value })
          "
          required
        />
        <!-- TODO: UNFINISHED & NOT FUNCTIONAL-> linked list implementation:
         selecting the department filters out the options for the business capabilities
         when you change the department the business capabilities field resets 
         and you have to choose a new bc based on the selected department -->
        <div class="app-form-col2 business-process">
          <Select
            name="department"
            label="department"
            :options="departments"
            :valueId="application.department?.id.toString()"
            :valueName="application.department?.name"
            @change="
              (event) =>
                (updatedApp = {
                  ...updatedApp,
                  departmentId: parseInt(event.target.value),
                })
            "
          />
          <Select
            name="business-cap"
            label="business capabilities"
            :options="
              application.department?.businessCapability
                ? application.department.businessCapability
                : businessCapabilities
            "
            :filter="application.department?.id"
            :valueId="application.department?.businessCapability?.id"
            :valueName="application.department?.businessCapability?.name"
            @change="
              (event) =>
                (updatedApp = {
                  ...updatedApp,
                  businessCapabilityId: parseInt(event.target.value),
                })
            "
          />
        </div>
        <TextInput
          name="version"
          label="version"
          :value="application.version"
          @input="
            (event) =>
              (updatedApp = { ...updatedApp, version: event.target.value })
          "
        />
        <Select
          name="criticality"
          label="criticality level"
          :options="criticalities"
          :valueId="application.criticality"
          :valueName="application.criticality"
          required
          @change="
            (event) =>
              (updatedApp = { ...updatedApp, criticality: event.target.value })
          "
        />
        <Select
          name="provider"
          label="provider"
          :options="providers"
          :valueId="application.provider?.id.toString()"
          :valueName="application.provider?.name"
          @change="
            (event) =>
              (updatedApp = {
                ...updatedApp,
                providerId: parseInt(event.target.value),
              })
          "
        />
        <Select
          name="contract-type"
          label="contract type"
          :options="contractTypes"
          :valueId="application.contractType"
          :valueName="application.contractType"
        />
        <TextArea
          name="description"
          label="description"
          :value="application.description"
          @input="
            (event) =>
              (updatedApp = { ...updatedApp, description: event.target.value })
          "
        />

        <div class="app-form-section technical">
          <h3>Technical information</h3>
          <div class="app-form-col2 hosting">
            <Select
              name="app-type"
              label="application type"
              :valueId="application.applicationType?.id.toString()"
              :valueName="application.contractType?.name"
              :options="applicationTypes"
              @change="
                (event) =>
                  (updatedApp = {
                    ...updatedApp,
                    applicationTypeId: parseInt(event.target.value),
                  })
              "
            />
            <Select
              name="hosting-type"
              label="hosting type"
              :valueId="application.hostingType"
              :valueName="application.hostingType"
              :options="hostingTypes"
              @change="
                (event) =>
                  (updatedApp = {
                    ...updatedApp,
                    hostingType: event.target.value,
                  })
              "
            />
          </div>
          <Select
            name="state"
            label="current state"
            :valueId="application.state"
            :valueName="application.state"
            :options="states"
            @change="
              (event) =>
                (updatedApp = { ...updatedApp, state: event.target.value })
            "
            required
          />
          <Checkbox
            name="language"
            label="languages"
            :options="languages"
            :values="application.languages"
            @newValues="handleNewValues"
          />
          <Checkbox
            name="software"
            label="softwares"
            :options="softwares"
            :values="application.softwares"
            @newValues="handleNewValues"
          />
        </div>
        <div class="app-form-section accountables">
          <h3>Accountables</h3>
          <AccountablesTable
            name="accountables"
            label="accountables"
            :author="application.author"
            :accountables="application.accountables"
            @updatedAccountables="handleNewValues"
          />
        </div>
      </div>
    </fieldset>
    <div class="btn-group">
      <button class="btn" @click="updateApplication">Edit</button>
    </div>
  </section>
  <section v-else-if="err">
    <h1>Not Found</h1>
    <p>{{ err.msg }}</p>
  </section>
  <section v-else>
    <p>Loading ...</p>
  </section>
</template>

<style scoped>
.app-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60%;
  margin: auto;
}

.app-form-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

fieldset.app-form {
  width: 100%;
  padding: 1rem;
}

.app-form-section {
  margin-bottom: 1rem;
}

.app-form-col2 {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
<script setup>
import SideBar from "@/components/nav/SideBar.vue";
import { onMounted, ref } from "vue";
import ProviderService from "@/services/providerService.js";
import Card from "primevue/card";
import pattern from "../assets/static/pattern.png";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

const providers = ref([]);
const provider = ref({
  name: "",
  description: "",
  location: "",
  url: "",
  logo: "",
});
const addProviderDialog = ref(false);

onMounted(async () => {
  try {
    providers.value = (await ProviderService.getAllProviders()).data;
  } catch (error) {
    console.error(error);
  }
});

function openProviderDialog() {
  addProviderDialog.value = true;
}

async function createProvider() {
  console.log(provider.value);
  let res = ProviderService.createProvider(provider.value);
  if (res.status === 201) {
    providers.value = (await ProviderService.getAllProviders()).data;
  }
  addProviderDialog.value = false;
}
</script>


<template>
  <main>
    <SideBar />
    <section class="container">
      <h1>Providers</h1>
      <div class="actions my-3">
        <Button
          label="Add Provider"
          severity="success"
          @click="openProviderDialog"
        />
      </div>
      <div class="grid w-full">
        <Card class="md:col-3" v-for="provider in providers" :key="provider.id">
          <template #header>
            <img :src="pattern" alt="Card" class="w-full" />
          </template>
          <template #title>{{ provider.name }}</template>
          <template #content>
            <p>{{ provider.description }}</p>
            <div>
              <div>{{ provider.location }}</div>
              <a :href="provider.url" target="_blank">Site web</a>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <Dialog
      v-model:visible="addProviderDialog"
      :style="{ width: '450px' }"
      :modal="true"
    >
      <template #header>
        <h3>Add a new provider</h3>
      </template>

      <div class="confirmation-content">
        <div>
          <label for="name">Provider name</label>
          <InputText
            v-model="provider.name"
            placeholder="Provider name"
            class="w-full"
          />
        </div>
        <div>
          <label for="description">Description</label>
          <InputText
            v-model="provider.description"
            placeholder="Description"
            class="w-full"
          />
        </div>
        <div>
          <label for="location">Location</label>
          <InputText
            v-model="provider.location"
            placeholder="Location"
            class="w-full"
          />
        </div>
        <div>
          <label for="url">URL</label>
          <InputText v-model="provider.url" placeholder="URL" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          severity="danger"
          text
          @click="addProviderDialog = false"
        />
        <Button
          label="Create"
          icon="pi pi-check"
          severity="success"
          text
          @click="createProvider"
        />
      </template>
    </Dialog>
  </main>
</template>
<style lang="scss" scoped>
img {
  height: 20vh;
  width: 100%;
  object-fit: cover;
}
.container {
  padding: 0 2vw;
}
</style>
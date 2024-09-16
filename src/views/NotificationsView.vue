<script setup>
import SideBar from "@/components/nav/SideBar.vue";
import applicationService from "@/services/applicationService.js";
import userService from "@/services/userService.js";
import { onMounted, ref } from "vue";
import Message from 'primevue/message';

let notifications = ref([]);
let applications = ref([]);
let currentUser = ref({});

onMounted(async () => {
  try {
    currentUser.value = (await userService.getCurrentUser()).data;
    console.log(currentUser.value);
    applications.value = await (
      await applicationService.getAllApplications()
    ).data;
    console.log(applications.value);
     applications.value.forEach((app) => {
      if (
        app.validationStatus == "TO_BE_VALIDATED" &&
        app.author.email == currentUser.value.email
      ) {
        notifications.value.push(app);
      }
    });
    console.log(notifications.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <main>
    <SideBar />
    <section class="container" v-if="notifications">
      <h1>Notifications</h1>

      <div>
        {{ notifications }}
        <Message v-for="notification in notifications" :key="notification.id" severity="info" >
          <template #content>
            <div>
              <p>{{ notification }}</p>
            </div>
          </template>
        </Message>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 2vw;
}
</style>
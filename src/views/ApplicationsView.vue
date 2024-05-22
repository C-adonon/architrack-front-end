<script setup>
import { onMounted, ref, computed } from "vue";
import applicationService from "../services/applicationService";
import Tags from "./../components/pills_tags/Tags.vue";

const applications = ref([]);
let err = ref({ msg: "", value: false });

// TODO: TEMPORARY SOLUTION
let tagColor = computed(() => {
  return applications.value.map((app) => {
    switch (app.validationStatus) {
      case "VALIDATED":
        return "#4CAF50";
      case "REJECTED":
        return "#F44336";
      case "DRAFT":
        return "#FFC107";
      case "ARCHIVED":
        return "#9E9E9E";
      case "UNKNOWN":
        return "#333";
      case "TO_BE_VALIDATED":
        return "#2196F3";
      default:
        return "#333";
    }
  });
});

onMounted(async () => {
  try {
    applications.value = await applicationService.getAllApplications();
    console.log("apps: ", applications.value);
  } catch (error) {
    console.error(error);
    err.value = { msg: error, value: true };
  }
});
</script>

<template>
  <section v-if="applications">
    <h1>Applications</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Application type</th>
          <th>Department</th>
          <th>State</th>
          <th>Validation status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(application, index) in applications" :key="index">
          <router-link
            :to="{
              name: 'applicationsDetails',
              params: { id: application.id },
            }"
          >
            <td>{{ application.name }}</td>
            <td>{{ application.applicationType.name }}</td>
            <td>{{ application.department.name }}</td>
            <td>{{ application.state }}</td>
            <td>
              <Tags :text="application.validationStatus" :color="tagColor[index]" />
            </td>
          </router-link>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-else-if="err">
    <h1>Error</h1>
    <p>{{ err.msg }}</p>
  </section>
  <section v-else>
    <p>Loading...</p>
  </section>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: lightgray;
  color: #333;
  padding: 1rem 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th:first-child {
  border-top-left-radius: 0.5rem;
}

th:last-child {
  border-top-right-radius: 0.5rem;
}

td {
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #ddd;
}

tr a {
  color: #333;
  text-decoration: none;
  display: contents;
}

tr:hover {
  background-color: #f9f9f9;
}

tbody {
  border-left: solid 1px #ddd;
  border-right: solid 1px #ddd;
}
</style>
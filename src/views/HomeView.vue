<script setup>
import { onMounted, ref } from "vue";
import charDataService from "../services/charDataService";
import DashboardCard from "../components/cards/DashboardCard.vue";
import Button from "primevue/button";
import Card from "primevue/card";
import PieChart from "../components/charts/PieChart.vue";
import VerticalBarChart from "../components/charts/VerticalBarChart.vue";
import HorizontalBarChart from "../components/charts/HorizontalBarChart.vue";
import PolarChart from "../components/charts/PolarChart.vue";
import Logout from "@/views/LogoutView.vue";
import SideBarVue from "@/components/nav/SideBar.vue";

let rawData = ref({});
let err = ref({ msg: "", value: false });

onMounted(async () => {
  try {
    rawData.value = (await charDataService.getChartData()).data;
  } catch (error) {
    console.error(error);
    err.value = { msg: error, value: true };
  }
});
</script>

<template>
  <main>
    <SideBarVue />
    <section class="dashboard-container">
      <h1>Welcome</h1>
      <div
        class="dashboard-top-row flex flex-row flex-wrap justify-content-between mb-5"
      >
        <DashboardCard
          title="Number of applications"
          :content="rawData?.numberOfApplications"
        />
        <DashboardCard
          title="Number of providers"
          :content="rawData?.numberOfProviders"
        />
        <DashboardCard
          title="Number of business capabilites"
          :content="rawData?.numberOfBusinessCapabilities"
        />
      </div>
      <div class="dashboard-bottom-row">
        <!-- FIRST CHART  Applications by providers -->
        <Card>
          <template #title>Applications by states</template>
          <template #content>
            <PieChart
              v-if="rawData?.applicationsByState"
              :data="rawData?.applicationsByState"
            />
          </template>
        </Card>
        <!-- SECOND CHART Application by hosting type-->
        <Card>
          <template #title>Applications by hosting</template>
          <template #content>
            <VerticalBarChart
              v-if="rawData?.applicationsByHostingType"
              :data="rawData?.applicationsByHostingType"
            />
          </template>
        </Card>
        <!-- THIRD CHART -->
        <Card>
          <template #title>Applications by providers</template>
          <template #content>
            <HorizontalBarChart
              v-if="rawData?.applicationsByProvider"
              :data="rawData?.applicationsByProvider"
            />
          </template>
        </Card>
        <!-- FORTH CHART Application by Provider -->
        <Card>
          <template #title>Applications by validation status</template>
          <template #content>
            <PolarChart
              v-if="rawData?.applicationsByValidationStatus"
              :data="rawData?.applicationsByValidationStatus"
            />
          </template>
        </Card>
      </div>
    </section>
  </main>
</template>

<style scoped>
.dashboard-container{
  padding: 0 2vw;
}
.dashboard-bottom-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
}
</style>
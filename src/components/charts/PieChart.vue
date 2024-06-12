
<template>
  <div v-if="chartData" class="card flex justify-content-center">
    <Chart
      type="pie"
      :data="chartData"
      :options="chartOptions"
      class="h-15rem" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";

const props = defineProps({
  data: Array,
});

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: props.data.map((d) => d.label),
    datasets: [
      {
        data: props.data.map((d) => d.value),
        backgroundColor: [
          documentStyle.getPropertyValue("--cyan-500"),
          documentStyle.getPropertyValue("--orange-500"),
          documentStyle.getPropertyValue("--gray-500"),
          documentStyle.getPropertyValue("--red-500"),
          documentStyle.getPropertyValue("--blue-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--cyan-400"),
          documentStyle.getPropertyValue("--orange-400"),
          documentStyle.getPropertyValue("--gray-400"),
          documentStyle.getPropertyValue("--red-400"),
          documentStyle.getPropertyValue("--blue-400"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };
};
</script>

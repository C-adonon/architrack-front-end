import apiClient from "./apiClient";

export default {
  // CHART DATA
  getChartData() {
    return apiClient.get("/chartdata");
  },
};

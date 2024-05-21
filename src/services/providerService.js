import apiClient from "./apiClient";

export default {
  // PROVIDERS
  getAllProviders() {
    return apiClient.get("/providers");
  },
  getProviderById(id) {
    return apiClient.get("/providers/" + id);
  },
  createProvider(data) {
    return apiClient.post("/providers", data);
  },
  updateProvider(id, data) {
    return apiClient.put("/providers/" + id, data);
  },
  deleteProvider(id) {
    return apiClient.delete("/providers/" + id);
  },
};

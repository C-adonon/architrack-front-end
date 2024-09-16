import apiClient from "./apiClient";

export default {
  // APPLICATIONS
  getAllApplications() {
    return apiClient.get("/applications");
  },
  getApplicationById(id) {
    return apiClient.get("/applications/" + id);
  },
  createApplication(data) {
    return apiClient.post("/applications", data);
  },
  updateApplication(id, data) {
    return apiClient.put("/applications/" + id, data);
  },
  deleteApplication(id) {
    return apiClient.delete("/applications/" + id);
  },
  // APPLICATIONS ENUMS OPTIONS
  getApplicationStates() {
    return apiClient.get("/applications/states");
  },
  getApplicationCriticalities() {
    return apiClient.get("/applications/criticalities");
  },
  getApplicationContractTypes() {
    return apiClient.get("/applications/contracttypes");
  },
  getApplicationHostingTypes() {
    return apiClient.get("/applications/hostingtypes");
  },
  getApplicationValidationStatuses() {
    return apiClient.get("/applications/validationstatuses");
  }
};
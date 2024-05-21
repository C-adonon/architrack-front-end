import apiClient from "./apiClient";

export default {
  // APPLICATION TYPES
  getAllApplicationTypes() {
    return apiClient.get("/applicationtypes");
  },
  getApplicationTypeById(id) {
    return apiClient.get("/applicationtypes/" + id);
  },
  createApplicationType(data) {
    return apiClient.post("/applicationtypes", data);
  },
  updateApplicationType(id, data) {
    return apiClient.put("/applicationtypes/" + id, data);
  },
  deleteApplicationType(id) {
    return apiClient.delete("/applicationtypes/" + id);
  },
};

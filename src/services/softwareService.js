import apiClient from "./apiClient";

export default {
  // SOFTWARE
  getAllSoftwares() {
    return apiClient.get("/softwares");
  },
  getSoftwareById(id) {
    return apiClient.get("/softwares/" + id);
  },
  createSoftware(data) {
    return apiClient.post("/softwares", data);
  },
  updateSoftware(id, data) {
    return apiClient.put("/softwares/" + id, data);
  },
  deleteSoftware(id) {
    return apiClient.delete("/softwares/" + id);
  },
};

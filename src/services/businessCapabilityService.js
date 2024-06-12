import apiClient from "./apiClient";

export default {
  // BUSINESS CAPABILITIES
  getAllBusinessCapabilities() {
    return apiClient.get("/businesscapabilities");
  },
  getBusinessCapabilityById(id) {
    return apiClient.get("/businesscapabilities/" + id);
  },
  createBusinessCapability(data) {
    return apiClient.post("/businesscapabilities", data);
  },
  updateBusinessCapability(id, data) {
    return apiClient.put("/businesscapabilities/" + id, data);
  },
  deleteBusinessCapability(id) {
    return apiClient.delete("/businesscapabilities/" + id);
  },
};

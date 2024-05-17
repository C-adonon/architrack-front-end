import apiClient from "./apiClient";

export default {
  // DEPARTMENTS
  getAllDepartments() {
    return apiClient.get("/departments");
  },
  getDepartmentById(id) {
    return apiClient.get("/departments/" + id);
  },
  createDepartment(data) {
    return apiClient.post("/departments", data);
  },
  updateDepartment(id, data) {
    return apiClient.put("/departments/" + id, data);
  },
  deleteDepartment(id) {
    return apiClient.delete("/departments/" + id);
  },
};

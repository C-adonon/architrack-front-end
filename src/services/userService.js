import apiClient from "./apiClient";

export default {
  // USER
  getAllUsers() {
    return apiClient.get("/users");
  },
  getUserById(uuid) {
    return apiClient.get("/users/" + uuid);
  },
  getCurrentUser() {
    return apiClient.get("/users/me");
  },
  createUser(data) {
    return apiClient.post("/users", data);
  },
  updateUser(uuid, data) {
    return apiClient.put("/users/" + uuid, data);
  },
  deleteUser(uuid) {
    return apiClient.delete("/users/" + uuid);
  },
  // ENUM OPTIONS
  getUserRoles() {
    return apiClient.get("/users/roles");
  },
};

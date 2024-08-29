import apiClient from "../services/apiClient";

export default {
  login(data) {
    return apiClient.post("/auth/login", data);
  },
  register(data) {
    return apiClient.post("/auth/register", data);
  },
  logout() {
    return apiClient.get("/auth/logout");
  },
  refreshToken() {
    return apiClient.post("/auth/refreshtoken");
  },
};

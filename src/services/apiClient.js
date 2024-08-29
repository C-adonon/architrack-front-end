import axios from "axios";
import { useAuthStore } from "../store/authStore";

function formatResponse(response) {
  return response.data;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Accept": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "localhost:5173",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 403) {
      const authStore = useAuthStore();
      try {
        await authStore.refreshToken();

        return apiClient.request(error.config);
      } catch (refreshError) {
        authStore.logoutUser();
      }
    }
    return Promise.reject(error);
  }
);

export default {
  async get(endpoint) {
    return await apiClient.get(endpoint);
  },
  async post(endpoint, data) {
    return await apiClient.post(endpoint, data);
  },
  async put(endpoint, data) {
    return await apiClient.put(endpoint, data);
  },
  async delete(endpoint) {
    return await apiClient.delete(endpoint);
  },
};

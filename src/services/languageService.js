import apiClient from "./apiClient";

export default {
  // LANGUAGES
  getAllLanguages() {
    return apiClient.get("/languages");
  },
  getLanguageById(id) {
    return apiClient.get("/languages/" + id);
  },
  createLanguage(data) {
    return apiClient.post("/languages", data);
  },
  updateLanguage(id, data) {
    return apiClient.put("/languages/" + id, data);
  },
  deleteLanguage(id) {
    return apiClient.delete("/languages/" + id);
  },
};

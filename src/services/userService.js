import apiClient from "./apiClient";

export default {
    // USER
    getAllUsers() {
        return apiClient.get("/users");
    },
    getUserById(id) {
        return apiClient.get("/users/" + id);
    },
    createUser(data) {
        return apiClient.post("/users", data);
    },
    updateUser(id, data) {
        return apiClient.put("/users/" + id, data);
    },
    deleteUser(id) {
        return apiClient.delete("/users/" + id);
    },
    // ENUM OPTIONS
    getUserRoles() {
        return apiClient.get("/users/roles");
    }
};
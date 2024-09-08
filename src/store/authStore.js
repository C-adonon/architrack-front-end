import { defineStore } from "pinia";
import authService from "@/auth";
import userService from "@/services/userService";

async function getUserInfo() {
  try {
    let response = await userService.getCurrentUser();
    console.log("User info response", response.data);
    return response.data;
  } catch (error) {
    console.log("Error getting user info", error);
  }
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated:
      JSON.parse(localStorage.getItem("isAuthenticated")) || false,
    user: {},
  }),
  actions: {
    persistToLocalStorage() {
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(this.isAuthenticated)
      );
      this.user = getUserInfo();
    },
    async loginUser(data) {
      let response = await authService.login(data);
      if (response.status === 200) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
      this.persistToLocalStorage();
      return response;
    },
    async registerUser(data) {
      let response = await authService.register(data);
      this.isAuthenticated = true;
      this.persistToLocalStorage();
      return response;
    },
    async refreshToken() {
      if (this.isAuthenticated) {
        let response = await authService.refreshToken();
        console.log("Refresh token response", response.data, response.status);
        if (response.status === 200) {
          this.isAuthenticated = true;
          this.user = response.data;
          console.log("Refreshed token");
        } else {
          this.isAuthenticated = false;
          console.log("Token refresh failed");
        }
        this.persistToLocalStorage();
        return response;
      }
    },
    async logoutUser() {
      let response = await authService.logout();
      this.isAuthenticated = false;
      console.log("Is logged out ");
      localStorage.clear();
      return response;
    },
  },
});

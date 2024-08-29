import { defineStore } from "pinia";
import authService from "@/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated:
      JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  }),
  actions: {
    persistToLocalStorage() {
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(this.isAuthenticated)
      );
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
        console.log("Refreshed token: ");
        this.isAuthenticated = true;
        this.persistToLocalStorage();
        return response;
      }
    },
    async logoutUser() {
      let response = await authService.logout();
      this.isAuthenticated = false;
      console.log("Is logged out ");
      this.persistToLocalStorage();
      return response;
    },
  },
});

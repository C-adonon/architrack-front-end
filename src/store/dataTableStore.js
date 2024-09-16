import { defineStore } from "pinia";
import applicationTypeService from "@/services/applicationTypeService";
import departmentService from "@/services/departmentService";
import applicationService from "@/services/applicationService";

export const useDataTableStore = defineStore("dataTable", {
  state: () => {
    return {
      applicationTypes: [],
      departments: [],
      applicationStates: [],
    };
  },
  actions: {
    async getApplicationTypes() {
      let response = await applicationTypeService.getAllApplicationTypes();
      this.applicationTypes = response.data;
      return response.data;
    },
    async getDepartments() {
      let response = await departmentService.getAllDepartments();
      this.departments = response.data;
      return response.data;
    },
    async getApplicationStates() {
      let response = await applicationService.getApplicationStates();
      this.applicationStates = response.data;
      return response.data;
    },
  },
});

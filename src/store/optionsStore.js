import { defineStore } from "pinia";
import applicationTypeService from "@/services/applicationTypeService";
import departmentService from "@/services/departmentService";
import applicationService from "@/services/applicationService";
import businessCapabilityService from "@/services/businessCapabilityService";
import providerService from "@/services/providerService";
import softwareService from "@/services/softwareService";
import languageService from "@/services/languageService";

export const useOptionsStore = defineStore("options", {
  state: () => {
    return {
      departments: [],
      businessCapabilities: [],
      criticalities: [],
      applicationTypes: [],
      ValidationStatuses: [],
      applicationStates: [],
      hostingTypes: [],
      contractTypes: [],
      providers: [],
      languages: [],
      softwares: [],
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
    async getBusinessCapabilities() {
      let response =
        await businessCapabilityService.getAllBusinessCapabilities();
      this.businessCapabilities = response.data;
      return response.data;
    },
    async getProviders() {
      let response = await providerService.getAllProviders();
      this.providers = response.data;
      return response.data;
    },
    async getSoftwares() {
      let response = await softwareService.getAllSoftwares();
      this.softwares = response.data;
      return response.data;
    },
    async getLanguages() {
      let response = await languageService.getAllLanguages();
      this.languages = response.data;
      return response.data;
    },
    async getCriticalities() {
      let response = await applicationService.getApplicationCriticalities();
      this.criticalities = response.data;
      return response.data;
    },
    async getHostingTypes() {
      let response = await applicationService.getApplicationHostingTypes();
      this.hostingTypes = response.data;
      return response.data;
    },
    async getContractTypes() {
      let response = await applicationService.getApplicationContractTypes();
      this.contractTypes = response.data;
      return response.data;
    },
    async getValidationStatuses() {
      let response =
        await applicationService.getApplicationValidationStatuses();
      this.applicationValidationStatuses = response.data;
      return response.data;
    },
  },
});

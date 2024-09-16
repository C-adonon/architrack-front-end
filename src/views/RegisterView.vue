<script setup>
import { RouterLink, useRoute , useRouter} from "vue-router";
import { onMounted, ref } from "vue";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import userService from "@/services/userService";
import departmentService from "@/services/departmentService.js";
import authService from "../auth/index.js";

const router = useRouter();

let email = ref("");
let password = ref("");
let firstname = ref("");
let lastname = ref("");
let role = ref("STANDARD_USER");
let departmentId = ref(0);

let registerInfo = ref({
  firstname: firstname.value,
  lastname: lastname.value,
  email: email.value,
  password: password.value,
  role: role.value,
  departmentId: departmentId.value,
});

const allRoles = ref([]);
const allDepartments = ref([]);

const toast = useToast();

let detail = ref("");
let summary = ref("");

const showError = () => {
  toast.add({
    severity: "error",
    summary: "Missing information",
    detail: "All fields are required.",
    position: "center",
    life: 3000,
  });
};

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Account created",
    detail: "Your account has been successfully created.",
    position: "center",
    life: 3000,
  });
};

onMounted(async () => {
  try {
    let rolesResponse = await userService.getUserRoles();
    if (rolesResponse) allRoles.value = rolesResponse.data;

    let depResponse = await departmentService.getAllDepartments();
    if (depResponse) allDepartments.value = depResponse.data;
  } catch (error) {
    console.error(error);
  }
});

function checkRequiredInfo(info) {
  let allAttributesNotNull = Object.values(info).every(
    (value) => value !== null
  );

  if (allAttributesNotNull) {
    showSuccess();
  } else {
    showError();
  }
}

async function handleRegister() {
  try {
    console.log({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      role: role.value,
      departmentId: departmentId.value,
    });

    let res = await authService.register({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      role: role.value,
      departmentId: departmentId.value,
    });
    if (res.status === 201) {
      router.push({ path: "/" });
      showSuccess();
    }
    console.log(res);
  } catch (error) {
    // summary.value = error.error;
    // detail.value = error.details;
    // showError();
    console.error(error);
  }
}
</script>

<template>
  <Toast />
  <div id="register-container" class="" v-if="allDepartments && allRoles">
    <section
      id="register-form"
      class="flex flex-column justify-content-center gap-3 md:w-4 w-11 m-auto"
    >
      <img id="register-logo" src="../assets/static/logo.svg" alt="logo" />

      <div id="register-title">
        <h1 class="font-bold text-2xl">Register</h1>
      </div>

      <div id="firstname">
        <label for="firstname" class="font-bold block mb-2"
          >Firstname <span class="required-field">*</span></label
        >
        <InputText
          id="firstname"
          class="w-full"
          type="text"
          v-model="firstname"
          placeholder="John"
          variant="filled"
        />
      </div>
      <div id="lastname">
        <label for="lastname" class="font-bold block mb-2"
          >Lastname <span class="required-field">*</span></label
        >
        <InputText
          id="lastname"
          class="w-full"
          type="text"
          v-model="lastname"
          placeholder="Doe"
          variant="filled"
        />
      </div>

      <div id="role">
        <label for="role" class="font-bold block mb-2"
          >Role <span class="required-field">*</span></label
        >
        <div class="flex flex-wrap gap-2">
          <div
            class="flex align-items-center"
            v-for="(userRole, index) in allRoles"
            :key="index"
          >
            <RadioButton
              name="role"
              v-model="role"
              :inputId="index.toString()"
              :value="userRole"
            />
            <label for="role" class="lowercase ml-2">{{
              userRole.replace("_", " ")
            }}</label>
          </div>
        </div>
      </div>

      <div id="department">
        <label for="department" class="font-bold block mb-2"
          >Department <span class="required-field">*</span></label
        >
        <Dropdown
          v-model="departmentId"
          :options="allDepartments"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a department"
          checkmark
          :highlightOnSelect="false"
          class="w-full"
        >
        </Dropdown>
      </div>

      <div id="email-input">
        <label for="email" class="font-bold block mb-2"
          >Professional email <span class="required-field">*</span></label
        >
        <InputText
          id="email"
          class="w-full"
          type="text"
          v-model="email"
          placeholder="jonh.doe@corp.com"
          variant="filled"
        />
      </div>

      <div id="password-input">
        <label for="password" class="font-bold block mb-2"
          >Password <span class="required-field">*</span></label
        >
        <Password class="w-full" v-model="password" toggleMask variant="filled">
          <template #footer>
            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
            </ul>
          </template>
        </Password>
      </div>

      <Button
        label="Send account request"
        id="submit-register"
        @click="handleRegister()"
      />

      <span>
        Already have an account ?
        <RouterLink to="/login">Login here !</RouterLink>
      </span>
    </section>
    <section id="register-img" class="md:block hidden"></section>
  </div>
</template>

<style scoped>
:deep(.p-password-input) {
  flex: 1;
}

#register-container {
  display: flex;
  justify-content: center;
  height: 100vh;
}

#register-form {
  width: 50%;
}

#register-img {
  width: 50%;
  background-color: #fff8f3;
  background-image: url("../assets/static/pattern.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#register-logo {
  height: 5vh;
}
</style>
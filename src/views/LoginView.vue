<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
// import authService from "@/auth";
import Logout from "@/views/LogoutView.vue";
import Toast from '@/components/toasts/Toast.vue';

const router = useRouter();

const email = ref("");
const password = ref("");
const authStore = useAuthStore();

async function handleLogin() {
  try {
    // OLD CODE
    console.log(email.value, password.value);
    // let res = await authService.login({
    //   email: email.value,
    //   password: password.value,
    // });
    // NEW CODE
    let res = await authStore.loginUser({
      email: email.value,
      password: password.value,
    });
    console.log(res);
    router.push({ path: "/" });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <Logout />
  <div id="login-container"> 
    <section
      id="login-form"
      class="flex flex-column justify-content-center gap-3 md:w-4 w-11 m-auto"
    >
      <img
        id="login-logo"
        class=""
        src="../assets/static/logo.svg"
        alt="logo"
      />

      <div id="login-title">
        <h1 class="font-bold text-2xl">Login</h1>
      </div>

      <div id="email-input">
        <label for="email" class="font-bold block mb-2"
          >Professional email</label
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
        <label for="password" class="font-bold block mb-2">Password</label>
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

      <Button label="Login" id="submit-login" @click="handleLogin()" />

      <span>
        Request your account
        <RouterLink to="/register" replace>here</RouterLink>
      </span>
    </section>

    <section id="login-img" class="md:block hidden"></section>
  </div>
</template>

<style scoped>
:deep(.p-password-input) {
  flex: 1;
}

#login-container {
  display: flex;
  justify-content: center;
  height: 100vh;
}

#login-form {
  width: 50%;
}

#login-img {
  width: 50%;
  background-color: #fff8f3;
  background-image: url("../assets/static/pattern.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#login-logo {
  height: 5vh;
}
</style>
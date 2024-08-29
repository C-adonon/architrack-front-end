import { useAuthStore } from "@/store/authStore";
import AdminView from "@/views/AdminView.vue";
import ApplicationsDetailsView from "@/views/ApplicationsDetailsView.vue";
import ApplicationsView from "@/views/ApplicationsView.vue";
import BusinessProcessView from "@/views/BusinessProcessView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TechnicalView from "@/views/TechnicalView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: { requiresAuth: true },
    },
    {
      path: "/businessprocess",
      name: "businessProcess",
      component: BusinessProcessView,
      meta: { requiresAuth: true },
    },
    {
      path: "/technical",
      name: "technical",
      component: TechnicalView,
      meta: { requiresAuth: true },
    },
    {
      path: "/applications/:id",
      name: "applicationsDetails",
      component: ApplicationsDetailsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/applications",
      name: "applications",
      component: ApplicationsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      component: HomeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
    // }
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: "/login" });
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.name === "admin" && !authStore.isAuthenticated) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });
export default router;

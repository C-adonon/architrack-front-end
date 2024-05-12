import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminView from "@/views/AdminView.vue";
import BusinessProcessView from "@/views/BusinessProcessView.vue";
import TechnicalView from "@/views/TechnicalView.vue";
import ApplicationsView from "@/views/ApplicationsView.vue";
import ApplicationsDetailsView from "@/views/ApplicationsDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
    {
      path: "/businessprocess",
      name: "businessProcess",
      component: BusinessProcessView,
    },
    {
      path: "/technical",
      name: "technical",
      component: TechnicalView,
    },
    {
      path: "/applications/:id",
      name: "applicationsDetails",
      component: ApplicationsDetailsView,
    },
    {
      path: "/applications",
      name: "applications",
      component: ApplicationsView,
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

// Guards
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !useStore().isAuthenticated) {
//     next({ path: "/" });
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.name === "admin" && !localStorage.getItem("token")) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });
export default router;

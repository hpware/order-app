import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/Tabs.vue";
import login from "@/pages/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/app/login",
  },
  {
    path: "/test",
    redirect: "/app/testlogin",
  },
  {
    path: "/app/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/app/login",
      },
      {
        path: "login",
        component: () => import("@/pages/LoginPage.vue"),
      },
      {
        path: "home",
        component: () => import("@/pages/Home.vue"),
      },
      {
        path: "user",
        component: () => import("@/pages/CurrentUser.vue"),
      },
      {
        path: "404",
        component: () => import("@/pages/NotFound.vue")
      }
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/app/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

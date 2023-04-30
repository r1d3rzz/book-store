import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookDetail from "../views/BookDetail.vue";
import BookCreate from "../views/BookCreate.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/books/detail/:id",
    name: "bookDetail",
    component: BookDetail,
    props: true,
  },
  {
    path: "/books/create",
    name: "bookCreate",
    component: BookCreate,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

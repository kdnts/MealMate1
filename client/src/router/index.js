// client/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import SearchView from "../views/SearchView.vue";
import MenuView from "../views/MenuView.vue";

const routes = [
  { path: "/", name: "Search", component: SearchView },
  { path: "/menu", name: "Menu", component: MenuView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

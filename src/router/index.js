import { createRouter, createWebHistory } from "vue-router";
import InnerList from "@/components/InnerList";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: "shoppingList",
      path: "/shopping-list/:id",
      component: InnerList,
    },
  ],
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const pathView = (path) => {
  return () => import(`@/views/${path}`);
};
const pathComponent = (path) => {
  return () => import(`@/components/${path}`);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: pathView("Main"),
    children: [
      {
        path: "tasks",
        name: "TasksPage",
        component: pathView("tasks/tasks"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

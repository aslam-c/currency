import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

import register from "@/components/register";
import login from "@/components/login";

import error from "@/components/404";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld,
      meta: { auth: true }
    },
    {
      path: "/register",
      name: "register",
      component: register,
      meta: { auth: false }
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: { auth: false }
    },
    {
      path: "*",
      name: "error",
      component: error
    }
  ]
});

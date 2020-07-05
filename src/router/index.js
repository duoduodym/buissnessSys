import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { checkToken } from "../libs/util/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/index/index.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "home",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/home/home.vue"),
      },
      {
        path: "cmpMng",
        meta: {
          title: "企业管理",
          requireAuth: true,
        },
        component: () => import("@/components/parentCmp/parentCmp.vue"),
        children: [
          {
            path: "employeeMng",
            meta: {
              title: "员工管理",
              requireAuth: true,
            },
            component: () => import("@/views/cmpMng/employeeMng/employeeMng.vue"),
          },
          {
            path: "roleMng",
            meta: {
              title: "角色管理",
              requireAuth: true,
            },
            component: () => import("@/views/cmpMng/roleMng/roleMng.vue"),
          },
          {
            path: "cmpInfo",
            meta: {
              title: "企业信息",
              requireAuth: true,
            },
            component: () => import("@/views/cmpMng/cmpInfo/cmpInfo.vue"),
          },
        ],
      },
      {
        path: "financeMng",
        component: () => import("@/components/parentCmp/parentCmp.vue"),
        meta: {
          title: "财务管理",
          requireAuth: true,
        },
        children: [
          {
            path: "categoryMng",
            meta: {
              title: "分类管理",
              requireAuth: true,
            },
            component: () => import("@/views/financeMng/categoryMng/categoryMng.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("beforeEach");
  console.log(from);
  if (to.matched.some((record) => record.meta.requireAuth)) {
    checkToken();
    if (store.getters.getToken) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;

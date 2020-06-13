import Vue from "vue";
import VueRouter from "vue-router";

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
            component: () =>
              import("@/views/cmpMng/employeeMng/employeeMng.vue"),
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
            component: () =>
              import("@/views/financeMng/categoryMng/categoryMng.vue"),
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

export default router;

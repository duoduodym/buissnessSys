import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./config/plugin";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/fontIcon/iconfont.css";
import "@/assets/reset.css"; /*引入公共样式*/
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (store.getters.getToken) {
      if (to.path === "/login") {
        window.location.reload();
      } else {
        next();
      }
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

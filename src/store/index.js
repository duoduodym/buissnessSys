import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tenantId: "303c2f92-ea05-416c-a300-eaafe77c8030",
    token: "",
  },
  mutations: {
    refreshToken: (state, token) => {
      state.token = token;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getToken: (state) => {
      return state.token;
    },
  },
});

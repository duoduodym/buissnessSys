import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tenantId: "",
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

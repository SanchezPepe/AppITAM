import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dev: false,
    loading: false,
    window: {
      width: 0,
      height: 0
    }
  },
  getters: {
    connUrl: state => {
      if (state.dev) return "http://localhost:8080/";
      else return "https://firebasestorage.googleapis.com/";
    }
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updateWindow(state, newData) {
      state.window.width = newData[0];
      state.window.height = newData[1];
    }
  },
  actions: {
    toggleLoading(context) {
      context.commit("toggleLoading");
    },
    updateWindow(context, data) {
      context.commit("updateWindow", data);
    }
  }
});

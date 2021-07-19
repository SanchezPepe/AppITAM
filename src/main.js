import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueTreeNavigation from "vue-tree-navigation";
import VueAnalytics from "vue-analytics";

Vue.use(VueTreeNavigation);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: "258261857",
  router
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

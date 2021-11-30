import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { AgGridVue } from "ag-grid-vue"
import Axios from 'axios';

const localToken = localStorage.getItem('auth._token.local');
Vue.config.productionTip = false;
Axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Axios.defaults.headers = { Authorization: `Bearer ${localToken}` };

Vue.config.productionTip = false
Vue.component("ag-grid-vue", AgGridVue)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")

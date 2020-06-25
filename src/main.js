import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

//this can be changed to the public url once deployed
Vue.prototype.$hostname =
  "http://ec2-54-183-229-163.us-west-1.compute.amazonaws.com";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from 'vue2-google-maps';


//Styles
import "./styles/styles.scss"

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD_E_dcrekWZNXaKc2mSKc3dnN31bk_L2Y',
    libraries: 'places',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

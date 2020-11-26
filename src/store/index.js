import Vue from "vue";
import Vuex from "vuex";
import { userStore } from './modules/user-store.js'
import { tripStore } from './modules/trip-store.js'
import { bookingStore } from './modules/booking-store.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    tripStore,
    userStore,
    bookingStore
  }
});

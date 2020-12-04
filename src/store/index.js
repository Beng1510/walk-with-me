import Vue from "vue";
import Vuex from "vuex";
import { userStore } from './modules/user-store.js'
import { tripStore } from './modules/trip-store.js'
import { bookingStore } from './modules/booking-store.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: {
    isLoading(state) {
        return state.isLoading
    }
},
mutations: {
  setIsLoading(state, { isLoading }) {
      console.log('is Loading?:', isLoading);
      state.isLoading = isLoading
  }
},
  actions: {},
  modules: {
    tripStore,
    userStore,
    bookingStore
  }
});

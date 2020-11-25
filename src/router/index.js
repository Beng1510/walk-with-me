import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/homepage.vue";
import about from "../views/about.vue"
import tripList from "../cmps/trip/trip-list.vue"
import tripDetails from "../views/trip-details.vue"
<<<<<<< HEAD
import userDetails from "../views/user-details.vue"
import guideDetails from "../views/guide-details.vue"
import backOffice from "../views/back-office.vue"
=======
>>>>>>> d0b8f46679df4ec16d3c7c5d90e666d04ec41c85

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/user/:id",
    name: "user-details",
    component: userDetails
  },
  {
    path: "/trip",
    name: "trip-list",
    component: tripList
  },
  {
    path: "/trip/:id",
    name: "trip-details",
    component: tripDetails
  },
  {
<<<<<<< HEAD
    path: "/guide",
    name: "guide-details",
    component: guideDetails
  },
  {
    path: "/back-office",
    name: "back-office",
    component: backOffice
  },
  {
=======
>>>>>>> d0b8f46679df4ec16d3c7c5d90e666d04ec41c85
    path: "/about",
    name: "about",
    component: about
    
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

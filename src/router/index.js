import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/homepage.vue";
import about from "../views/about.vue"
import tripList from "../cmps/trip/trip-list.vue"
import tripDetails from "../views/trip-details.vue"
import userDetails from "../views/user-details.vue"
import guideDetails from "../views/guide-details.vue"
import backOffice from "../views/back-office.vue"

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

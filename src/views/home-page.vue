<template>
  <div class="home-page">
    <img class="hero" src="../assets/img/hero1.jpeg" />
    <h2>Let Us Guide You</h2>
    <span v-if="isLoading">Loading...</span>
    <trip-filter @filterBy="updateFilter" />
    <h3>All Trips</h3>
    <trip-list :trips="tripsForDisplay" @emitFav="addToFavs" />
    <hr />
    <h3>Mountain Trips</h3>
    <trip-list :trips="mountainTripsForDisplay" />
    <hr />
    <h3>Forest Trips</h3>
    <trip-list :trips="forestTripsForDisplay" />
    <hr />
    <h3>Seaside Trips</h3>
    <trip-list :trips="seaTripsForDisplay" />
    <hr />
    <h3>City Trips</h3>
    <trip-list :trips="cityTripsForDisplay" />
    <hr />
    <h3>Guide List</h3>
    <guide-list :users="guidesForDisplay" />

    <hr />
  </div>
</template>

<script>

import tripFilter from "../cmps/trip/trip-filter.cmp.vue";
import tripList from "../cmps/trip/trip-list.cmp.vue";
import guideList from "../cmps/guide/guide-list.cmp.vue";

export default {
  name: "home-page",
  data() {
    return {
      isLoading: false,
      user: null
    };
  },
  methods: {
    updateFilter(filterBy) {
      this.$store.commit({
        type: "setFilterBy",
        filterBy,
      });
      this.$store.dispatch({
        type: "loadTrips",
      });
    },
    addToFavs(id) {
      var userFavs = this.user.favoriteTrips;
      const trip = this.$store.getters.getTripById(id)
      let isFav = userFavs.map(userFav => userFav._id.includes(id));
      // if (isFav.includes(true)) {
      //    const idx = userFavs.findIndex((fav) => fav._id === this.trip._id);
      //   if (idx >= 0) {
      //     userFavs.splice(idx, 1);
      //   }
      // } else {
      //    userFavs.push({
      //     date: this.trip.date,
      //     name: this.trip.name,
      //     _id: this.trip._id,
      //   });
      // }
      console.log(trip);
    },
  },
  computed: {
    tripsForDisplay() {
      return this.$store.getters.tripsForDisplay;
    },
    mountainTripsForDisplay() {
      return this.$store.getters.mountainTripsForDisplay;
    },
    forestTripsForDisplay() {
      return this.$store.getters.forestTripsForDisplay;
    },
    seaTripsForDisplay() {
      return this.$store.getters.seaTripsForDisplay;
    },
    cityTripsForDisplay() {
      return this.$store.getters.cityTripsForDisplay;
    },
    guidesForDisplay() {
      return this.$store.getters.guidesForDisplay;
    }
  },
  components: {
    tripFilter,
    tripList,
    guideList,
  },
  created() {
    this.$store.dispatch({
      type: "loadTrips",
    });
    this.$store.dispatch({
      type: "loadUsers",
    });
    this.user = this.$store.getters.loggedinUser;
  },
};
</script>

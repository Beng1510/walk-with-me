<template>
  <div class="home-page">
    <div class="hero-container">
      <img class="hero" src="../assets/img/hero1.jpeg" />
    </div>
    <h2>Let Us Guide You</h2>
    <span v-if="isLoading">Loading...</span>
    <trip-filter @filterBy="updateFilter" :trips="tripsForDisplay" />
    <h3>All Trips</h3>
    <trip-list :trips="tripsForDisplay" @emitFav="addToFavs" />
    <hr />
    <h3>Top Mountain Trips</h3>
    <trip-list :trips="mountainTripsForDisplay" @emitFav="addToFavs" />
    <hr />
    <h3>Top Forest Trips</h3>
    <trip-list :trips="forestTripsForDisplay" @emitFav="addToFavs" />
    <hr />
    <h3>Top Seaside Trips</h3>
    <trip-list :trips="seaTripsForDisplay" @emitFav="addToFavs" />
    <hr />
    <h3>Top City Trips</h3>
    <trip-list :trips="cityTripsForDisplay" @emitFav="addToFavs" />
    <hr />
    <h3>Top Guides</h3>

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
      user: null,
    };
  },
  methods: {
    updateFilter(filterBy) {
      this.$store.dispatch({
        type: "filterTrips",
        filterBy,
      });

      this.$store.dispatch({
        type: "loadTrips",
      });
    },
    addToFavs(trip) {
      console.log("trip at home page", trip);
      let userFavs = this.user.favoriteTrips;
      let isFav = userFavs.map((userFav) => userFav._id.includes(trip._id));
      if (isFav.includes(true)) {
        const idx = userFavs.findIndex((fav) => fav._id === trip._id);
        if (idx >= 0) {
          userFavs.splice(idx, 1);
        }
      } else {
        userFavs.unshift({
          date: trip.date,
          name: trip.name,
          _id: trip._id,
        });
      }
      this.$store.dispatch({
        type: "updateUser",
        user: this.user,
        trip,
      });
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
    },
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
    // this.user = this.$store.getters.loggedinUser;
  },
  mounted() {
    this.user = this.$store.getters.loggedinUser;
  },
};
</script>

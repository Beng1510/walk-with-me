<template>
  <section class="home-page full">
    <div class="hero-container full flex column align-center">
      <img src="../assets/img/hero1.jpeg" />
      <h1 class="hero-txt head">Dream, Explore, Discover</h1>
      <h2 class="hero-txt small">Adventur awaits, let's find it together</h2>
    </div>
    <div class="home-page-content main-layout">
      <span v-if="isLoading">Loading...</span>
      <trip-filter @filterBy="updateFilter" :trips="tripsForDisplay" />
      <!-- <h3>All Trips</h3>
      <trip-list :trips="tripsForDisplay" @emitFav="toggleFav" /> -->
      <hr />
      <h3>Top Mountain Trips</h3>
      <trip-list :trips="mountainTripsForDisplay" @emitFav="toggleFav" />
      <hr />
      <h3>Top Forest Trips</h3>
      <trip-list :trips="forestTripsForDisplay" @emitFav="toggleFav" />
      <hr />
      <h3>Top Seaside Trips</h3>
      <trip-list :trips="seaTripsForDisplay" @emitFav="toggleFav" />
      <hr />
      <h3>Top City Trips</h3>
      <trip-list :trips="cityTripsForDisplay" @emitFav="toggleFav" />
      <hr />
      <h3>Top Guides</h3>

      <guide-list :users="guidesForDisplay" />

      <hr />
    </div>

    
  </section>
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
    toggleFav(trip) {
      this.$store.dispatch({
        type: 'toggleFavs',
        trip
      });
    }
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
    //   this.$store.dispatch({
    //   type: "loadBookings",
    // });
    
    // this.user = this.$store.getters.loggedinUser;
  },
  mounted() {
    this.user = this.$store.getters.loggedinUser;
  },
};
</script>

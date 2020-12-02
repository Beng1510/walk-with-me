<template>
  <section class="home-page full">
    <div class="hero-container full flex column align-center">
      <img src="../assets/img/hero1.jpeg" />
      <h1 class="hero-txt head">Dream, Explore, Discover</h1>
      <h2 class="hero-txt small">Adventure awaits, let's find it together</h2>
    </div>
    <span v-if="isLoading">Loading...</span>
    <trip-filter @filterBy="updateFilter" :trips="tripsForDisplay" />
    <div class="home-page-content main-layout">
      <hr />
      <button class="see-all-btn" @click="goToAllTrips()">See All</button>
      <h3>Top Mountain Trips</h3>
      <trip-list :trips="mountainTripsForDisplay" @emitFav="toggleFav" />
      <button class="see-all-mountain-btn" @click="toggleShowTrips('mountain')">
        See All Mountain Trips
      </button>
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
      <h3>Check Out Our Extreme Trips</h3>
      <trip-list :trips="difficultTripsForDisplay" @emitFav="toggleFav" />
      <button class="see-all-extreme-btn" @click="toggleShowTrips('Extreme')">
        See All Extreme Trips
      </button>

      <hr />
      <h3>One Day Trips in Europe</h3>
      <trip-list :trips="europeTripsForDisplay" @emitFav="toggleFav" />
      <button class="see-all-europe-btn" @click="toggleShowTrips('Europe')">
        See All Europe Trips
      </button>
      <button class="go-to-all-europe-btn" @click="updateFilterPage('Europe')">
        Go To Europe Trips
      </button>
      <hr />
      <h3>Guides of the Month</h3>
      <guide-list :guides="guidesForDisplay" />
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
      filterBy: {
        name: "",
        type: "",
        location: "",
        region: "",
      },
    };
  },
  methods: {
    updateFilterPage(param) {
      this.filterBy.region = param;
      this.$store.commit({ type: "setFilterBy", filterBy: this.filterBy });

      // this.$store.dispatch({
      //   type: "filterTrips",
      //   filterBy: this.filterBy,
      // });

      this.$router.push("/trip");
    },

    updateFilter(filterBy) {
      // this.$store.dispatch({
      //   type: "filterTrips",
      //   filterBy,
      // });
      this.$store.commit({ type: "setFilterBy", filterBy });
      this.$store.dispatch({
        type: "loadTrips",
      });
    },
    toggleFav(trip) {
      this.$store.dispatch({
        type: "toggleFavs",
        trip,
      });
    },
    goToAllTrips() {
      this.$router.push("/trip");
    },
    toggleShowTrips(showBy) {
      this.$store.dispatch({
        type: "toggleShow",
        showBy,
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
    difficultTripsForDisplay() {
      return this.$store.getters.difficultTripsForDisplay;
    },
    europeTripsForDisplay() {
      return this.$store.getters.europeTripsForDisplay;
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
    this.$store.commit({
      type: "setFilterBy",
      filterBy: { name: "", type: "", location: "", region: "" },
    });

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

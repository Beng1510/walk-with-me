<template>
  <section class="home-page">
    <span v-if="isLoading">Loading...</span>
    <button class="see-all-btn" @click="goToAllTrips()">See All</button>
    <h3>Trips Across Europe</h3>
    <button class="go-to-all-btn" @click="updateFilterPage('region','Europe')">
      See All
    </button>
    <trip-list :trips="europeTripsForDisplay" @emitFav="toggleFav" />
    <h3>Trips Across America</h3>
    <button class="go-to-all-btn" @click="updateFilterPage('region','USA')">
      See All
    </button>
    <trip-list :trips="usaTripsForDisplay" @emitFav="toggleFav" />

    <h3>Top Mountain Trips</h3>
    <button class="go-to-all-btn" @click="updateFilterPage('type','mountain')">
      See All
    </button>
    <trip-list :trips="mountainTripsForDisplay" @emitFav="toggleFav" />

    <h3>Top Forest Trips</h3>
    <button class="go-to-all-btn" @click="updateFilterPage('type','forest')">
      See All
    </button>
    <trip-list :trips="forestTripsForDisplay" @emitFav="toggleFav" />

    <h3>Top City Trips</h3>
    <button class="see-all-mountain-btn" @click="updateFilterPage('type','city')">
      See All
    </button>
    <trip-list :trips="cityTripsForDisplay" @emitFav="toggleFav" />

    <h3>Guides of the Month</h3>
    <guide-list :guides="guidesForDisplay" />
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
    updateFilterPage(prop, term) {
      this.filterBy[prop] = term
        this.$store.commit({ type: "setFilterBy", filterBy: this.filterBy });
        this.$router.push("/trip");
    },
    updateFilter(filterBy) {
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
  },
  computed: {
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
    usaTripsForDisplay() {
      return this.$store.getters.usaTripsForDisplay;
    },
    guidesForDisplay() {
      return this.$store.getters.guidesForDisplay;
    },
  },
  components: {
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
     this.user = this.$store.getters.loggedinUser;
  },
  mounted() {
    this.user = this.$store.getters.loggedinUser;
  },
};
</script>

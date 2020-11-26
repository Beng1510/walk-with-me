<template>
  <div class="home-page">
    <h2>Walk With Me</h2>
    <span v-if="isLoading">Loading...</span>
    <trip-filter @filterBy="updateFilter" />
    <h3> All Trips </h3>
    <trip-list :trips="tripsForDisplay" />
    <hr/>
    <h3> Mountain Trips </h3>
    <trip-list :trips="mountainTripsForDisplay" />
     <hr/>
    <h3> Forest Trips </h3>
    <trip-list :trips="forestTripsForDisplay" />
    <hr/>
    <h3> Seaside Trips </h3>
    <trip-list :trips="seaTripsForDisplay" />
    <hr/>
    <h3> City Trips </h3> 
    <trip-list :trips="cityTripsForDisplay" />
    <hr/>
    <h3> Guide List </h3>
    <guide-list :users="guidesForDisplay" />

    <hr/>
  </div>
</template>

<script>
// @ is an alias to /src

import tripFilter from "../cmps/trip/trip-filter.cmp.vue";
import tripList from "../cmps/trip/trip-list.cmp.vue";
import guideList from "../cmps/guide/guide-list.cmp.vue"

export default {
  name: "home-page",
  data() {
    return {
      isLoading: false,
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
    // tripsForHomeDisplay() {
    //   return this.$store.getters.tripsForHomeDisplay;
    // }
  },
  components: {
    tripFilter,
    tripList,
    guideList
  },
  created() {
    console.log("got here");
    this.$store.dispatch({
      type: "loadTrips",
    });
    this.$store.dispatch({
      type: "loadUsers",
    });
  },
};
</script>

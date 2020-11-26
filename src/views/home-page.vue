<template>
  <div class="home-page">
    <h2>Walk With Me</h2>
    <span v-if="isLoading">Loading...</span>
    <trip-filter @filterBy="updateFilter" />
    <trip-list :trips="tripsForDisplay" />
  </div>
</template>

<script>
// @ is an alias to /src

import tripFilter from "../cmps/trip/trip-filter.cmp.vue";
import tripList from "../cmps/trip/trip-list.cmp.vue";

export default {
  name: "home-page",
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    updateFilter(filterBy) {
      this.$store.commit({
        type: "setFilterBy",
        filterBy
      });
      this.$store.dispatch({
        type: "loadTrips"
      });
    }
  },
  computed: {
    tripsForDisplay() {
      return this.$store.getters.tripsForDisplay;
    },
    // tripsForHomeDisplay() {
    //   return this.$store.getters.tripsForHomeDisplay;
    // }
  },
  components: {
    tripFilter,
    tripList,
  },
  created() {
    console.log("got here");
    this.$store.dispatch({
      type: "loadTrips"
    });
  }
};
</script>

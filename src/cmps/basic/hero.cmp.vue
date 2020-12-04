<template>
  <section class="hero full flex column align-center justify-center">
    <h1 class="hero-txt head">Dream, Explore, Discover</h1>
    <h2 class="hero-txt small">Adventure awaits, let's find it together</h2>
    <trip-filter @filterBy="emitFilter" :trips="tripsForDisplay" />
  </section>
</template>

<script>
import tripFilter from "../trip/trip-filter.cmp.vue";

export default {
  components: {
    tripFilter
  },

  computed: {
    tripsForDisplay() {
      const allTrips = this.$store.getters.tripsForDisplay;
      return allTrips
    },
  },

  methods: {
    emitFilter(filter) {
      
      this.$emit("filterBy", filter);
    }
  },
   created() {
    this.$store.dispatch({
      type: "loadTrips",
    });
  },
};
</script>

<style></style>

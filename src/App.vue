<template>
  <section class="main-layout" id="app">
    <main-header :user="defaultUserForDisplay" class="full" />
    <hero @filterBy="updateFilter" />
    <main>
      <router-view />
      <main-footer />
    </main>
  </section>
</template>

<script>
import mainHeader from "./cmps/basic/main-header.cmp.vue";
import mainFooter from "./cmps/basic/main-footer.cmp.vue";
import hero from "./cmps/basic/hero.cmp.vue";

export default {
  components: {
    mainHeader,
    mainFooter,
    hero,
  },
  methods: {
    updateFilter(filterBy) {
      console.log(filterBy);
      this.$store.dispatch({
        type: "filterTrips",
        filterBy,
      });
    },
  },
  computed: {
    defaultUserForDisplay() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.$store.dispatch({
      type: "loadTrips",
    });
  },
};
</script>

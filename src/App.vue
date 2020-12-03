<template>
  <section class="main-layout" id="app">
    <main-header :user="defaultUserForDisplay" :class="{ dark:!homePage}" />
    <hero v-if="homePage" @filterBy="updateFilter" />
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
      this.$store.commit({
      type: "setFilterBy",
        filterBy,
      });
    },
  },
  computed: {
    defaultUserForDisplay() {
      return this.$store.getters.loggedinUser;
    },

    homePage() {
    return (this.$route.path === '/');
     

     }
  },
  created() {
    this.$store.dispatch({
      type: "loadTrips",
    });
  },
};
</script>

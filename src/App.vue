<template>
<section>
  <main-header :user="defaultUserForDisplay" />
  <main class="main-layout" id="app">
    <router-view />
    <main-footer />
  </main>
  </section>
</template>

<script>
import mainHeader from "./cmps/basic/main-header.cmp.vue";
import mainFooter from "./cmps/basic/main-footer.cmp.vue";

export default {
  components: {
    mainHeader,
    mainFooter,
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


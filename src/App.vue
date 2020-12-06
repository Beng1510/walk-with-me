<template>
  <section class="main-layout" id="app">
    <main-header
      :user="defaultUserForDisplay"
      :class="{ dark: !homePage }"
      :isHome="homePage"
    />
    <hero v-if="homePage" @filterBy="updateFilter" />
    <main>
      <router-view />
    </main>
    <main-footer />
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
      this.$store.dispatch({
        type: "loadTrips",
      });
    },
  },
  computed: {
    defaultUserForDisplay() {
      const userLogged = this.$store.getters.loggedinUser;
      console.log("userLogged", userLogged);
      return userLogged;
    },

    homePage() {
      return this.$route.path === "/";
    },
  },
  created() {
    this.$store.dispatch({
      type: "login",
      userCred: { name: "Charlie McBride", password: "123456" },
    });
    this.$store.dispatch({
      type: "loadTrips",
    });
  },
};
</script>

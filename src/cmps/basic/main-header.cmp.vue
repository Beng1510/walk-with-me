<template>
  <section class="main-header full main-layout">
    <div class="main-header-content flex space-between align-center">
      <div class="logo flex align-center">
        <router-link to="/"><h2 class="logo">Walk With Me</h2></router-link>
      </div>
      <user-msg></user-msg>

      <div class="nav-bar">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/user/:id" v-if="!user.isGuide">
          {{ userName(user) }}</router-link
        >

        <router-link to="/back-office" v-if="user.isGuide">
          {{ userName(user) }}'s Office</router-link>
        <button @click="becomeGuide(user)">Become a Guide</button>
      </div>
    </div>
  </section>
</template>

<script>
import userMsg from "./user-msg.cmp.vue";

export default {
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    userName(user) {
      var loggedUser = this.user.name;
      // var res = str.slice(0, 5);
      var userFullName = loggedUser.split(" ");
      return userFullName[0];
    },
    becomeGuide(user) {
      user.isGuide = !user.isGuide;
      console.log("user", user);
    },
    // guideName(user) {
    //   if (user.isGuide) return
    // },
  },
  components: {
    userMsg,
  },
};
</script>

<template>
  <section  class="main-header full main-layout">
    <div class="main-header-content flex space-between align-center">
      <div class="logo flex align-center">
        <router-link to="/"><h2 class="logo">Walk With Me</h2></router-link>
      </div>
      <user-msg :user="this.user"></user-msg>
      <!-- <user-msg ></user-msg> -->
      <template v-show="!isLoggingIn">
         
        <div v-if="loggedUser" class="login-btns">
          <button @click="loginSignUp('login')">Login</button>
          <button @click="loginSignUp('signUp')">Sign Up</button>
        </div>
        <template class="logout">
          <button @click="logout">Logout</button>
        </template>
      </template>

      <div class="nav-bar">
        <router-link to="/">Home</router-link> •
        <router-link to="/about">About</router-link> •
       
        <router-link to="/user/:id" >
         </router-link
        >
        <router-link to="/user/:id" v-if="!user.isGuide">
          {{ userName(user) }}</router-link
        >
        •

       
        <router-link to="/back-office" v-if="user.isGuide" >
          {{ userName(user) }}'s Office</router-link>
        
        <a @click="becomeGuide(user)">Become a Guide</a>
      </div>
    </div>
  </section>
</template>

<script>
import userMsg from "./user-msg.cmp.vue";
import socketService from "../../services/socket-service.js";

export default {
  props: {
    user: {
      type: Object,
    }
  },
  methods: {
    userName(user) {
      var loggedUser = this.user.name;
      var userFullName = loggedUser.split(" ");
      return userFullName[0];
    },
    becomeGuide(user) {

      user.isGuide = !user.isGuide;
      if (user.isGuide) {
        socketService.setup();
        // socketService.emit('guideId', );
        // socketService.emit('guideId', user._id);

      }
    },
    loginSignUp(action) {
      this.$store.commit({ type: "setLoginSignUp", action });
      if (this.$route.path !== "/login") this.$router.push("/login");
    },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
      this.$store.dispatch({ type: "loadTrip" });
    },
    // guideName(user) {
    //   if (user.isGuide) return
    // },
  },
  computed: {
    isLoggingIn() {
      return this.$route.path === "/login";
    },
    loggedUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  components: {
    userMsg,
  },
};
</script>

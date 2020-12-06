<template>
  <section class="main-header full main-layout">
    <!-- <p v-if="isLoading">Loading...</p> -->
    <div class="main-header-content flex space-between align-center">
      <div class="logo flex align-center">
        <router-link to="/"><img v-if="isHome" src="@/assets/logo/logo-text-OW.svg" class="logo" />
        <img v-else src="@/assets/logo/logo-O.svg" class="logo" />
        </router-link>
      </div>
      <user-msg :user="this.user"></user-msg>
      <template v-show="!isLoggingIn">
        <div v-if="loggedUser" class="login-btns">
          <button v-if="!loggedUser" @click="loginSignUp('login')">
            Login
          </button>
          <button v-if="!loggedUser" @click="loginSignUp('signUp')">
            Sign Up
          </button>
        </div>
        <template class="logout">
          <button @click="logout">Logout</button>
        </template>
      </template>

      <div class="nav-bar">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/user/:id" v-if="!user.isGuide">
          {{ userName(user) }}</router-link
        >

        <router-link to="/back-office" v-if="user.isGuide">
          {{ userName(user) }}'s Office</router-link
        >

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
    },
    isHome: {
      type: Boolean
    }
  },

  data() {
   return {
      imgSrc: ''
   }
  },

  methods: {
    userName(user) {
      var loggedUser = this.user.name;
      

      var userFullName = loggedUser.split(" ");
      return userFullName[0];
    },
    becomeGuide(user) {
      // user.isGuide = !user.isGuide;
      // if (user.isGuide) {
      //   socketService.setup();
      // }
      this.$store.dispatch({
        type:"login",
        userCred:{  name: "Arnold Wellington", password: "123456" }

      })
    },
    loginSignUp(action) {
      this.$store.commit({ type: "setLoginSignUp", action });
      if (this.$route.path !== "/login") this.$router.push("/login");
    },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
      this.$store.dispatch({ type: "loadTrip" });
    },
     isHomePage() {
      let isHomePage = this.$route.path === "/";
      if (isHomePage) return 'text-OW';
      else return 'O';
    },
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
  created(){
    // console.log('user main header:', this.user)
  }
};
</script>

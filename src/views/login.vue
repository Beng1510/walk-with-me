<template>
  <section class="login flex f-col f-center">
    <h1>{{ titleToShow }}</h1>
    <form @submit.prevent="sendUserDetails" class="flex f-col">
      <input type="text" v-model="user.name" placeholder="Enter Username" />

      <div class="pass">
        <input
          :type="showPass"
          v-model="user.password"
          placeholder="Enter Password"
        /><i :class="showPassClass" @click="isShowPass = !isShowPass"></i>
      </div>
      <button>{{ btnTextToShow }}</button>
      <button @click="homePage">Back to the home page</button>
    </form>
  </section>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../services/eventBus-service.js";

export default {
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      isShowPass: false,
    };
  },
  methods: {
    async sendUserDetails() {
      if (
        (!this.isLogin && !this.user.name) ||
        !this.user.password ||
        !this.user.name
      ) {
        console.log("Fill all the details!!");
        return;
      }
      const res = await this.$store.dispatch({
        type: this.isLogin ? "login" : "signup",
        userCred: this.user,
      });

      if (res.err) {
        console.log("err", res.err);
      }

      
      if (this.isLogin) {
        eventBusService.$emit(SHOW_MSG, {
          txt: `Welcome ${this.user.name}`,
          subTxt: "Login Success",
          type: "success",
        });
      } else {
        eventBusService.$emit(SHOW_MSG, {
          txt: `Welcome ${this.user.name}`,
          subTxt: "Signup  Success",
          type: "success",
        });
      }

      this.$router.push("/");
    },
    homePage() {
      this.$router.push("/");
    },
  },
  computed: {
    titleToShow() {
      return this.isLogin ? "Login" : "Sign Up";
    },
    btnTextToShow() {
      return this.isLogin ? "Login" : "Sign Up";
    },
    showPass() {
      return this.isShowPass ? "text" : "password";
    },
    showPassClass() {
      return {
        "fas fa-eye": !this.isShowPass,
        "fas fa-eye-slash": this.isShowPass,
      };
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {},
};
</script>
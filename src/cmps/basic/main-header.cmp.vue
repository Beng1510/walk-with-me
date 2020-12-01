<template>
  <section class="main-header full main-layout">
    <div class="main-header-content flex space-between align-center">
      <div class="logo flex align-center">
        <router-link to="/"><h2>Walk With Me</h2></router-link> 
      </div>
      <user-msg></user-msg>
      <div class="nav-bar">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/user/:id">Profile</router-link> |
        <router-link to="/back-office">Back Office</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import userMsg from './user-msg.cmp.vue'

export default {
  components: {
    userMsg
  },
};
</script>


<template>
  <section class="main-header">
    
    
    <div class="logo-container">
    
    <router-link to="/"><h2 class="logo">Walk With Me</h2></router-link> 
    </div>
 <user-msg></user-msg>

    <div class="nav-bar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user/:id">Profile</router-link> |
            <router-link to="/back-office">Back Office</router-link>

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


<template>
  <section class="main-header">
    <div class="logo-container">
    
    <h2 class="logo">Walk With Me</h2>
    </div>

    <div class="nav-bar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user/:id">UserPage</router-link>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
};
</script>


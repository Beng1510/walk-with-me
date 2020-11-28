<template>
  <section class="guide-preview" @click="goToGuide(user._id)">
    <!-- <img :src="user.profileImgUrl"> -->
    <img
      class="guide-preview-img"
      :src="require('@/assets/img/users/' + user.profileImgUrl)"
    />
    <div class="guide-preview-info-container">
      <h2>{{ user.name }}</h2>
      Guide Rating: <p>{{ user.guideInfo.rate }}</p> <br/>
      <p>
        <i v-for="n in 5" :key="n" class="fas fa-star trip-star-rate"></i>
      </p> <br/>
     <p>{{user.guideInfo.description}}</p><br/>

     Review: "<p>{{user.guideInfo.reviews[0].txt}}</p>"
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  name: "guide-preview",

  methods: {
    goToGuide(id) {
      this.$router.push(`/guide/${id}`);
    },
  },
};
</script>

<style>
</style>